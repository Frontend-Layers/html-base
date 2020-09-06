;(() => {
  "use strict"

  const {src, dest, parallel, series, watch} = require("gulp")

  /**
   * Modules
   */

  // Styles
  const sass = require("gulp-sass")
  const postcss = require("gulp-postcss")
  const autoprefixer = require("autoprefixer")
  const purify = require("gulp-purifycss")

  // Server
  const connect = require("gulp-connect")
  const open = require("gulp-open")
  const del = require("del")

  // Notification
  const plumber = require("gulp-plumber")
  const notify = require("gulp-notify")

  // Source Maps
  const sourcemaps = require("gulp-sourcemaps")

  // Versions
  const bump = require("gulp-bump")

  // JS Modules
  const rollup = require("rollup").rollup
  const babel = require("rollup-plugin-babel")
  const alias = require("@rollup/plugin-alias")

  // Prettifier
  const prettify = require("gulp-prettify")

  // Compressors
  const uglify = require("gulp-uglify")
  const htmlmin = require("gulp-htmlmin")
  const cssnano = require("cssnano")

  // Images
  const imagemin = require("gulp-imagemin")
  const imageminPngquant = require("imagemin-pngquant")
  const imageminZopfli = require("imagemin-zopfli")
  const imageminMozjpeg = require("imagemin-mozjpeg")
  const imageminJpegRecompress = require("imagemin-jpeg-recompress")
  const imageminGiflossy = require("imagemin-giflossy")
  const webp = require("gulp-webp")
  const cache = require("gulp-cache")

  // HTML Test
  const htmlValidator = require("gulp-w3c-html-validator")

  /**
   * Config
   */
  const cfg = {
    src: {
      scss: "./src/scss/**/*.scss",
      css: "./src/styles/**/*.css",
      js: "./src/javascript/**/*.js",
      img: "./src/images/**/*",
      webp: "./dist/images/**/*.{png,jpg,jpeg}",
      html: "./src/*.html",
      htmlUpdates: "./dist/*.html",
      fonts: "./src/fonts/**/*",
      favicons: "./src/favicons/**/*",
      video: "./src/video/**/*",
    },
    dest: {
      scss: "./src/styles/",
      css: "./dist/styles/",
      js: "./src/javascript/**/*.js",
      img: "./dist/images/",
      webp: "./dist/images/**/*.{png,jpg,jpeg}",
      html: "./dist/",
      fonts: "./src/fonts/**/*",
      favicons: "./src/favicons/**/*",
      video: "./src/video/**/*",
    },
    build: {
      img: "./build/images/",
    },
    server: {
      host: "0.0.0.0",
      root: "./dist/",
      port: 4000,
      src: "./dist/index.html",
      uri: "http://localhost:4000/",
    },
    roll: {
      input: "./src/javascript/app.js",
      output: "./dist/javascript/app.js",
      format: "iife",
    },
  }

  /*
   * JavaScript
   * ============================================================= */

  const roll = () =>
    rollup({
      input: cfg.roll.input,
      plugins: [
        babel(),
        alias({
          entries: [
            {find: "src", replacement: `${__dirname}/src/javascript/`},
            {find: "vendor", replacement: `${__dirname}/node_modules/`},
          ],
        }),
      ],
    }).then((bundle) => {
      return bundle.write({
        file: cfg.roll.output,
        format: cfg.roll.format,
        name: "library",
        sourcemap: true,
      })
    })

  // Reload Browser after JS Changes
  const scripts = () => src(cfg.src.js).pipe(connect.reload())

  // JS Minify
  const compressJS = () =>
    src("./dist/javascript/**/*.js")
      .pipe(uglify())
      .pipe(dest("./build/javascript/"))

  /*
   * Styles
   * ============================================================= */

  const scss = () =>
    src(cfg.src.scss)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(
        sass({
          outputStyle: "expanded",
          errLogToConsole: false,
        })
      )
      .on("error", notify.onError())
      .pipe(sourcemaps.write("./"))
      .pipe(dest(cfg.dest.scss))
      .pipe(connect.reload())

  /**
   * Purify CSS
   */
  const cssPurify = () =>
    src("./src/styles/main.css")
      .pipe(sourcemaps.init())
      .pipe(purify(["./dist/javascript/**/*.js", "./src/**/*.html"]))
      .pipe(sourcemaps.write("./"))
      .pipe(dest("./dist/styles/"))

  /**
   * PostCSS, Autoprefixer, CSS compressor
   */
  const cssCompress = () =>
    src("./dist/styles/**/*.css")
      .pipe(plumber())
      .pipe(postcss([autoprefixer(), cssnano()]))
      .on("error", notify.onError())
      .pipe(dest("./build/styles/"))
      .pipe(connect.reload())

  /*
   * Images
   * ============================================================= */

  // Images Minify
  const images = () =>
    src(cfg.src.img)
      .pipe(
        cache(
          imagemin([
            imageminPngquant({
              speed: 1,
              quality: [0.95, 1],
            }),
            imageminZopfli({
              more: true,
            }),
            imageminGiflossy({
              optimizationLevel: 3,
              optimize: 3, //keep-empty: Preserve empty transparent frames
              lossy: 2,
            }),
            imagemin.svgo({
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            }),
            imagemin.mozjpeg({
              progressive: true,
            }),
            imageminJpegRecompress({
              loops: 6,
              min: 40,
              max: 85,
              quality: "low",
            }),
            imageminMozjpeg({
              quality: 90,
            }),
          ])
        )
      )
      .pipe(dest(cfg.dest.img))
      .pipe(dest(cfg.build.img))

  // WEBP
  const imgWebp = () =>
    src(cfg.src.webp).pipe(cache(webp())).pipe(dest(cfg.dest.img)).pipe(dest(cfg.build.img))

  /*
   * HTML
   * ============================================================= */

  const html = () => src(cfg.src.htmlUpdates).pipe(connect.reload())

  // HTML Beautifier
  const htmlBeautifier = () =>
    src(cfg.src.html)
      .pipe(
        prettify({
          indent_inner_html: true,
          indent_size: 2,
          unformatted: ["pre", "code"],
        })
      )
      .pipe(dest("./dist/"))

  // HTML Minify
  const htmlCompress = () =>
    src("./dist/*.html")
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
      .pipe(dest("./build/"))
      .pipe(connect.reload())

  const copyFiles = () =>
    src(["./src/_redirects", "./src/robots.txt", "./src/favicon.ico"], {
      allowEmpty: true,
    })
      .pipe(dest("./dist/"))
      .pipe(dest("./build/"))
      .pipe(connect.reload())

  const copyVideo = () =>
    src("./src/video/**/*")
      .pipe(dest("./dist/video/"))
      .pipe(dest("./build/video/"))
      .pipe(connect.reload())

  const copyFonts = () =>
    src("./src/fonts/**/*")
      .pipe(dest("./dist/fonts/"))
      .pipe(dest("./build/fonts/"))
      .pipe(connect.reload())

  const copyIcons = () =>
    src("./src/favicons/**/*")
      .pipe(dest("./dist/favicons/"))
      .pipe(dest("./build/favicons/"))
      .pipe(connect.reload())

  /*
   * Server
   * ============================================================= */

  /**
   * Create Local Web Server
   */
  const openServer = () => {
    connect.server({
      host: cfg.server.host,
      root: cfg.server.root,
      port: cfg.server.port,
      livereload: true,
    })
  }

  /**
   * Open Default Browser
   */
  const openBrowser = () =>
    src(cfg.server.src)
      .pipe(plumber())
      .pipe(
        open({
          uri: cfg.server.uri,
        })
      )

  /**
   * Watcher
   */
  const watcher = () => {
    watch(cfg.src.favicons, copyIcons)
    watch(cfg.src.fonts, copyFonts)
    watch(cfg.src.video, copyVideo)
    watch(cfg.src.scss, series(scss, cssPurify, cssCompress))
    watch(cfg.src.img, series(images, imgWebp))
    watch(cfg.src.html, series(html, htmlBeautifier, htmlCompress))
    watch(cfg.src.js, series(roll, scripts, compressJS))
  }

  /**
   * Patching
   */
  const bumper = () => src("./package.json").pipe(bump()).pipe(dest("./"))

  /**
   * Clean
   */
  const clean = () => {
    return del(["./build"])
  }

  /**
   * Bundle Minimize
   */
  const bundleMin = () => {
    return del([
      "./build",
      "./tests",
      "./doc",
      "./src/favicons",
      "./src/fonts",
      "./src/video",
      "./src/design.html",
      "./src/home.html",
      "./src/article.html",
      "./src/product.html",
      "./src/robots.text",
      "./src/_redirects",
      "./src/images/html5-logo.svg",
      "./src/images/test-photo.jpg",
      "./CONTRIBUTING.md",
      "./CODE_OF_CONDUCT.md",
      "./LICENSE",
      "./README.md",
      "./dist",
    ])
  }

  /*
   * Tests
   * ============================================================= */

  /**
   * Validate HTML
   */
  const validateHtml = () =>
    src(cfg.src.html)
      .pipe(plumber())
      .pipe(htmlValidator())
      .on("error", notify.onError())

  /*
   * Tasks
   * ============================================================= */

  /**
   * Default Tasks
   */
  exports.default = series(
    parallel(
      copyFiles,
      copyVideo,
      copyFonts,
      copyIcons,
      series(roll, compressJS),
      series(scss, cssPurify, cssCompress),
      series(images, imgWebp),
      series(htmlBeautifier, htmlCompress),
      openServer,
      openBrowser,
      watcher
    )
  )

  /**
   * Test Tasks
   */
  exports.test = parallel(validateHtml)

  /**
   * Build Tasks
   */
  exports.build = series(
    clean,
    parallel(
      copyFiles,
      copyVideo,
      copyFonts,
      copyIcons,
      series(roll, compressJS),
      series(scss, cssPurify, cssCompress),
      series(images, imgWebp),
      series(htmlBeautifier, htmlCompress),
    ),
    bumper
  )

  /**
   * Bundle minification Tasks
   */
  exports.min = series(bundleMin)
})()

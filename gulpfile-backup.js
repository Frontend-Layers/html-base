; (() => {
  'use strict'
  const { src, dest, parallel, series, watch } = require('gulp')

  /**
   * Modules
   */

  // Styles
  const sass = require('gulp-sass')(require('sass'))
  const postcss = require('gulp-postcss')
  const autoprefixer = require('autoprefixer')
  const purify = require('gulp-purifycss')

  // Server
  const connect = require('gulp-connect')
  const open = require('gulp-open')
  const del = require('del')
  const concat = require('gulp-concat')

  // Notification
  const plumber = require('gulp-plumber')
  const notify = require('gulp-notify')

  // Source Maps
  const sourcemaps = require('gulp-sourcemaps')

  // Versions
  const bump = require('gulp-bump')

  // HTML
  const tpl = require('gulp-nunjucks-render')

  // JS Modules
  const rollup = require('rollup')
  const babel = require('@rollup/plugin-babel').babel
  const alias = require('@rollup/plugin-alias')
  const commonjs = require('@rollup/plugin-commonjs')
  const nodeResolve = require('@rollup/plugin-node-resolve').nodeResolve

  // Prettifier
  const prettify = require('gulp-prettify')

  // Compressors
  const uglify = require('gulp-uglify')
  const htmlmin = require('gulp-htmlmin')
  const cssnano = require('cssnano')

  // Images
  const imagemin = require('gulp-imagemin')
  const imageminPngquant = require('imagemin-pngquant')
  const imageminZopfli = require('imagemin-zopfli')
  const imageminMozjpeg = require('imagemin-mozjpeg')
  const imageminJpegRecompress = require('imagemin-jpeg-recompress')
  const imageminGiflossy = require('imagemin-giflossy')
  const webp = require('gulp-webp')
  const cache = require('gulp-cache')

  // SVG
  const sprite = require('gulp-svg-sprite')

  // HTML Test
  // ref: https://github.com/validator/gulp-html
  const htmlValidator = require('gulp-html')

  /**
   * Settings
   */

  // Enable CSS Purify
  const enablePurify = false

  /**
   * Config
   */
  const cfg = {
    src: {
      scss: './src/scss/**/*.scss',
      css: './src/styles/**/*.css',
      js: './src/javascript/**/*.js',
      img: './src/images/**/*',
      webp: './dist/images/**/*.{png,jpg,jpeg}',
      html: './src/**/*.html',
      htmlUpdates: './dist/*.html',
      fonts: './src/fonts/**/*',
      favicons: './src/favicons/**/*',
      video: './src/video/**/*',
    },
    dest: {
      scss: './src/styles/',
      css: './dist/styles/',
      js: './src/javascript/**/*.js',
      img: './dist/images/',
      webp: './dist/images/**/*.{png,jpg,jpeg}',
      html: './dist/',
      fonts: './src/fonts/**/*',
      favicons: './src/favicons/**/*',
      video: './src/video/**/*',
    },
    build: {
      img: './build/images/',
    },
    server: {
      host: '0.0.0.0',
      root: './dist/',
      port: 4000,
      src: './dist/index.html',
      uri: 'http://localhost:4000/',
    },
    roll: {
      input: './src/javascript/app.js',
      output: './dist/javascript/app.js',
      format: 'iife',
    },
  }

  /*
   * JavaScript
   * ============================================================= */

  // Vendor JS Libraries
  const jsVendorList = {
    libs: ['./dist/javascript/app.js'],
  }

  const jsVendorLibs = () =>
    src(jsVendorList.libs)
      .pipe(concat('app.js'))
      .pipe(dest('./dist/javascript/'))

  /**
   * Rollup.js
   */
  const roll = () =>
    rollup
      .rollup({
        input: cfg.roll.input,
        plugins: [
          babel({
            babelHelpers: 'bundled',
          }),
          alias({
            entries: [
              { find: 'src', replacement: `${__dirname}/src/javascript/` },
            ],
          }),
          nodeResolve({
            browser: true,
            preferBuiltins: false,
          }),
          commonjs({
            include: ['node_modules/**'],
            exclude: [],
            sourceMap: false,
          }),
        ],
      })
      .then((bundle) => {
        return bundle.write({
          file: cfg.roll.output,
          format: cfg.roll.format,
          name: 'library',
          sourcemap: false,
        })
      })

  // Reload Browser after JS Changes
  const scripts = () => src(cfg.src.js).pipe(connect.reload())

  // JS Minify
  const compressJS = () =>
    src('./dist/javascript/**/*.js')
      .pipe(uglify())
      .pipe(dest('./build/javascript/'))

  // JS Copy
  const copyJS = () =>
    src('./dist/javascript/**/*.js').pipe(dest('./build/javascript/'))

  /*
   * Styles
   * ============================================================= */

  const scss = () =>
    src(cfg.src.scss)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(
        sass({
          outputStyle: 'expanded',
          errLogToConsole: false,
          includePaths: ['node_modules', 'bower_components', 'src', '.'],
        })
      )
      .on('error', notify.onError())
      .pipe(sourcemaps.write('./'))
      .pipe(dest(cfg.dest.scss))
      .pipe(dest(cfg.dest.css))

  const cssPostCSS = () =>
    src('./src/styles/main.css')
      .pipe(plumber())
      .pipe(postcss([autoprefixer()]))
      .on('error', notify.onError())
      .pipe(dest('./dist/styles/'))

  /**
   * Purify CSS
   */
  const cssPurify = () => {
    if (enablePurify === true) {
      return src('./dist/styles/main.css')
        .pipe(plumber())
        .pipe(purify(['./dist/javascript/**/*.js', './src/**/*.html']))
        .on('error', notify.onError())
        .pipe(dest('./dist/styles/'))
        .pipe(connect.reload())
    } else {
      return src('./dist/styles/main.css')
        .pipe(dest('./dist/styles/'))
        .pipe(connect.reload())
    }
  }

  /**
   * PostCSS, Autoprefixer, CSS compressor
   */
  const cssCompress = () =>
    src('./dist/styles/**/*.css')
      .pipe(plumber())
      .pipe(postcss([autoprefixer(), cssnano()]))
      .on('error', notify.onError())
      .pipe(dest('./build/styles/'))
      .pipe(connect.reload())

  /*
   * Images
   * ============================================================= */

  // Images Minify
  const imagesCompress = () =>
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
                { optimizationLevel: 3 },
                { progressive: true },
                { interlaced: true },
                { removeViewBox: false },
                { removeUselessStrokeAndFill: false },
                { cleanupIDs: false },
              ],
            }),
            imagemin.mozjpeg({
              progressive: true,
            }),
            imageminJpegRecompress({
              loops: 6,
              min: 40,
              max: 85,
              quality: 'low',
            }),
            imageminMozjpeg({
              quality: 90,
            }),
          ])
        )
      )
      .pipe(dest(cfg.dest.img))

  /**
   * Webp
   * @src: https://www.smashingmagazine.com/2018/07/converting-images-to-webp/
   */
  const webpCompress = () =>
    src(cfg.src.webp)
      .pipe(
        cache(
          webp({
            quality: 75,
          })
        )
      )
      .pipe(dest(cfg.dest.img))

  /**
   * SVG Sprite
   */

  const svgSprite = () =>
    src('./src/images/sprite/*.svg')
      .pipe(
        sprite({
          transform: ['svgo'],
          mode: {
            symbol: {
              sprite: '../sprite.svg',
              render: {
                scss: {
                  dest: '../../scss/_sprite.scss',
                },
              },
            },
          },
        })
      )
      .pipe(dest('./src/images/'))

  const imgCopy = () => src('./src/images/**/*').pipe(dest('./dist/images/')).pipe(dest('./build/images/'))

  /*
   * HTML
   * ============================================================= */

  // HTML Template Sytem + Beautifier
  const htmlGenerate = () =>
    src('./src/**/*.html')
      .pipe(plumber())
      .pipe(
        tpl({
          path: ['./src/'],
        })
      )
      .pipe(
        prettify({
          indent_inner_html: true,
          indent_size: 2,
          unformatted: ['pre', 'code'],
        })
      )
      .on('error', notify.onError())
      .pipe(dest('./dist'))

  // Refresh HTML after src update
  const htmlRefresh = () => src('./dist/**/*.html').pipe(connect.reload())

  // HTML Minify
  const htmlCompress = () =>
    src('./dist/*.html')
      .pipe(plumber())
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
          minifyJS: true,
          minifyCSS: true,
        })
      )
      .on('error', notify.onError())
      .pipe(dest('./build/'))
      .pipe(connect.reload())

  const copyFiles = () =>
    src(
      [
        './src/_redirects',
        './src/_headers',
        './src/robots.txt',
        './src/favicon.ico',
      ],
      {
        allowEmpty: true,
      }
    )
      .pipe(dest('./dist/'))
      .pipe(connect.reload())

  const copyBuildFiles = () =>
    src(['./dist/**/*'], {
      allowEmpty: true,
    }).pipe(dest('./build/'))

  const copyVideo = () =>
    src('./src/video/**/*').pipe(dest('./dist/video/')).pipe(connect.reload())

  const copyFonts = () =>
    src('./src/fonts/**/*').pipe(dest('./dist/fonts/')).pipe(connect.reload())

  const copyIcons = () =>
    src('./src/favicons/**/*')
      .pipe(dest('./dist/favicons/'))
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
    watch(cfg.src.scss, scss)
    watch(cfg.src.html, series(htmlGenerate, cleanDist, htmlRefresh))
    watch(cfg.src.js, series(series(roll, jsVendorLibs), scripts))
    watch(cfg.src.img, imgCopy)
    watch(cfg.src.favicons, copyIcons)
    watch(cfg.src.fonts, copyFonts)
    watch(cfg.src.video, copyVideo)
  }

  /**
   * Patching
   */
  const bumper = () => src('./package.json').pipe(bump()).pipe(dest('./'))

  /**
   * Clean
   */
  const clean = () => {
    return del(['./build'])
  }

  const cleanDist = () => {
    return del(['./dist/layouts'])
  }

  /**
   * Clear Cache
   */
  const casheClear = () => cache.clearAll()

  /**
   * Bundle Minimize
   */
  const bundleMin = () => {
    return del([
      './build',
      './tests',
      './doc',
      './src/favicons',
      './src/fonts',
      './src/video',
      './src/design.html',
      './src/home.html',
      './src/article.html',
      './src/product.html',
      './src/robots.text',
      './src/_redirects',
      './src/_headers',
      './src/images/html5-logo.svg',
      './src/images/test-photo.jpg',
      './CONTRIBUTING.md',
      './CODE_OF_CONDUCT.md',
      './LICENSE',
      './README.md',
      './dist',
    ])
  }

  /*
   * Tests
   * ============================================================= */

  /**
   * Validate HTML
   */
  const validateHtml = () =>
    src('./dist/*.html')
      .pipe(plumber())
      .pipe(htmlValidator())
      .on('error', notify.onError())

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
      series(series(roll, jsVendorLibs)),
      series(scss),
      series(imgCopy),
      series(htmlGenerate, cleanDist, openBrowser),
      openServer,
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
    copyBuildFiles,
    parallel(
      series(series(roll, jsVendorLibs), compressJS),
      series(scss, cssCompress, cssPurify),
      series(imgCopy),
      series(htmlGenerate, cleanDist, htmlCompress)
    ),
    bumper
  )

  /**
   * Bundle minification Tasks
   */
  exports.min = series(bundleMin)

  /**
   * Generate Compressed Images
   */
  exports.images = series(imagesCompress, webpCompress)

  /**
   * Generate SVG Sprite
   */
  exports.sprite = series(svgSprite)

  // Generate HTML
  exports.html = series(htmlGenerate, cleanDist)

  // Clear Cache
  exports.clear = series(casheClear)
})()

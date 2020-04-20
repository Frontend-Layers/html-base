(() => {

  'use strict';

  const {
    src,
    dest,
    parallel,
    series,
    watch
  } = require('gulp');

  /**
   * Modules
   */

  // Styles
  const sass = require('gulp-sass');
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');

  // Server
  const connect = require('gulp-connect');
  const open = require('gulp-open');

  // Notification
  const plumber = require('gulp-plumber');
  const notify = require('gulp-notify');

  // Source Maps
  const sourcemaps = require('gulp-sourcemaps');

  // JS Modules
  const rollup = require('rollup').rollup;
  const babel = require('rollup-plugin-babel');

  // Images
  const imagemin = require('gulp-imagemin');
  const imageminPngquant = require('imagemin-pngquant');
  const imageminZopfli = require('imagemin-zopfli');
  const imageminMozjpeg = require('imagemin-mozjpeg');
  const imageminJpegRecompress = require('imagemin-jpeg-recompress');
  const imageminGiflossy = require('imagemin-giflossy');
  const webp = require('gulp-webp');

  // HTML Test
  const htmlValidator = require('gulp-w3c-html-validator');

  /**
   * Config
   */
  const cfg = {
    src: {
      cssMain: './styles/main.css',
      css: './styles/',
      sass: './scss/**/*.scss',
      js: './javascript/**/*.js',
      jsBuild: './build/javascript/**/*.js',
      img: './images/**/*',
      webp: './images/**/*.{png,jpg,jpeg}',
      html: './*.html',
      fonts: './fonts/**/*'
    },
    server: {
      host: '0.0.0.0',
      root: './',
      port: 5500,
      src: './index.html',
      uri: 'http://localhost:5500/'
    },
    roll: {
      input: './javascript/app.js',
      output: './build/javascript/app.js',
      format: 'iife'
    },
    build: {
      css: './build/styles/',
      js: './build/javascript/',
      img: './build/images/',
      fonts: './build/fonts/'
    },
  };


  /**
   * JS Bundler
   */
  const roll = () =>
    rollup({
      input: cfg.roll.input,
      plugins: [
        babel()
      ]
    }).then(bundle => {
      return bundle.write({
        file: cfg.roll.output,
        format: cfg.roll.format,
        name: 'library',
        sourcemap: true
      });
    });

  // Reload Browser after JS Changes
  const scripts = () =>
    src(cfg.src.js)
    .pipe(connect.reload());

  /**
   * Styles
   */
  const styles = () =>
    src(cfg.src.sass)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
      //outputStyle: 'compressed',
      errLogToConsole: false
    }))
    .on('error', notify.onError())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(cfg.src.css))
    .pipe(connect.reload());



  /**
   * PostCSS, Autoprefixer
   */
  const css = () =>
    src(cfg.src.css)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(postcss([
      autoprefixer()
    ]))
    .on('error', notify.onError())
    .pipe(sourcemaps.write('./'))
    .pipe(dest(cfg.build.css))
    .pipe(connect.reload());


  /**
   * Scripts
   */
  const scripts = () =>
    src(cfg.src.jsBuild)
    .pipe(connect.reload());




  /**
   * Images
   */
  const images = () =>
    src(cfg.src.img)
    .pipe(dest(cfg.build.img))
    .pipe(connect.reload());




  /**
   * Fonts
   */
  const fonts = () =>
    src(cfg.src.fonts)
    .pipe(dest(cfg.build.fonts))
    .pipe(connect.reload());



  /**
   * HTML
   */
  const html = () =>
    src(cfg.src.html)
    .pipe(connect.reload())


  /**
   * Create Local Web Server
   */
  const openServer = () => {
    connect.server({
      host: cfg.server.host,
      root: cfg.server.root,
      port: cfg.server.port,
      livereload: true
    });
  };

  /**
   * Open Default Browser
   */
  const openBrowser = () =>
    src(cfg.server.src)
    .pipe(plumber())
    .pipe(open({
      uri: cfg.server.uri
    }));


  /**
   * Watcher
   */
  const watcher = () => {
    watch(cfg.src.fonts, fonts);
    watch(cfg.build.css, css);
    watch(cfg.src.sass, styles);
    watch(cfg.src.jsBuild, scripts);
    watch(cfg.src.img, images);
    watch(cfg.src.html, html);
    watch(cfg.src.js, roll);
    watch(cfg.src.js, scripts);
  };


  /**
   * Images
   */

  // Images Minify
  const imgCompress = () =>
    src(cfg.src.img)
    .pipe(imagemin([
      imageminPngquant({
        speed: 1,
        quality: [0.95, 1]
      }),
      imageminZopfli({
        more: true
      }),
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3, //keep-empty: Preserve empty transparent frames
        lossy: 2
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      imagemin.mozjpeg({
        progressive: true
      }),
      imageminJpegRecompress({
        loops: 6,
        min: 40,
        max: 85,
        quality: 'low'
      }),
      imageminMozjpeg({
        quality: 90
      })
    ]))
    .pipe(dest(cfg.build.img));


  // WEBP
  const imgWebp = () =>
    src(cfg.src.webp)
    .pipe(webp())
    .pipe(dest(cfg.build.img));



  /**
   * Tests
   */
  const validateHtml = () =>
    src(cfg.src.html)
    .pipe(plumber())
    .pipe(htmlValidator())
    .on('error', notify.onError());


  /**
   * Tasks
   */

  // Development Tasks
  exports.default = parallel(roll, series(styles, css), openServer, openBrowser, watcher);

  // Image Compression
  exports.img = series(imgCompress, imgWebp);

  // Test Tasks
  exports.test = parallel(validateHtml);
})();

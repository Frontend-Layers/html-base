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

  // Versions
  const bump = require('gulp-bump');

  // JS Modules
  const rollup = require('rollup').rollup;
  const babel = require('rollup-plugin-babel');
  const alias = require('@rollup/plugin-alias');

  // Images
  const imagemin = require('gulp-imagemin');
  const imageminPngquant = require('imagemin-pngquant');
  const imageminZopfli = require('imagemin-zopfli');
  const imageminMozjpeg = require('imagemin-mozjpeg');
  const imageminJpegRecompress = require('imagemin-jpeg-recompress');
  const imageminGiflossy = require('imagemin-giflossy');
  const webp = require('gulp-webp');
  const cache = require('gulp-cache');

  // HTML Test
  const htmlValidator = require('gulp-w3c-html-validator');

  /**
   * Config
   */
  const cfg = {
    src: {
      scss: './scss/**/*.scss',
      css: './styles/**/*.css',
      js: './javascript/**/*.js',
      jsBuild: './build/javascript/**/*.js',
      img: './images/**/*',
      webp: './build/images/**/*.{png,jpg,jpeg}',
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
    dest: {
      scss: './styles/',
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
        babel(),
        alias({
          entries: [
            {
              find: 'App', replacement: `${__dirname}/javascript/`
            }
          ]
        })
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
    src(cfg.src.scss)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass({
        outputStyle: 'expanded',
        //outputStyle: 'compressed',
        errLogToConsole: false
      }))
      .on('error', notify.onError())
      .pipe(sourcemaps.write('./'))
      .pipe(dest(cfg.dest.scss))
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
      .pipe(dest(cfg.dest.css))
      .pipe(connect.reload());


  /**
   * Fonts
   */
  const fonts = () =>
    src(cfg.src.fonts)
      .pipe(dest(cfg.dest.fonts))
      .pipe(connect.reload());



  /**
   * HTML
   */
  const html = () =>
    src(cfg.src.html)
      .pipe(connect.reload())



  /**
   * Images
   */

  // Images Minify
  const images = () =>
    src(cfg.src.img)
      .pipe(cache(imagemin([
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
      ])))
      .pipe(dest(cfg.dest.img));


  // WEBP
  const imgWebp = () =>
    src(cfg.src.webp)
      .pipe(cache(webp()))
      .pipe(dest(cfg.dest.img));



  /**
   * Tests
   */

  const validateHtml = () =>
    src(cfg.src.html)
      .pipe(plumber())
      .pipe(htmlValidator())
      .on('error', notify.onError());



  /**
   * Server
   */


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
    watch(cfg.src.scss, series(styles, css));
    watch(cfg.src.img, series(images, imgWebp));
    watch(cfg.src.html, html);
    watch(cfg.src.js, series(roll, scripts));
  };

  /**
   * Patching
   */
  const bumper = () =>
    src('./package.json')
      .pipe(bump())
      .pipe(dest('./'));


  /**
   * Tasks
   */

  // Development Tasks
  exports.default = parallel(series(roll,scripts), series(styles, css), series(images, imgWebp), fonts, openServer, openBrowser, watcher);

  // Images Compression
  exports.img = series(images, imgWebp);

  // Test Tasks
  exports.test = parallel(validateHtml);

  // Build
  exports.build = parallel(bumper);

})();

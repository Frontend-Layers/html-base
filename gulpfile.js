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

  // HTML Test
  const htmlValidator = require('gulp-w3c-html-validator');

  /**
   * Config
   */
  const cfg = {
    src: {
      css: './styles/',
      sass: './scss/**/*.scss',
      js: './javascript/**/*.js',
      jsBuild: './build/javascript/**/*.js',
      img: './images/**/*.png',
      html: './*.html',
    },
    server: {
      host: '0.0.0.0',
      root: './',
      port: 5500,
      src: './index.html',
      uri: 'http://localhost:5500/',
    },
    roll: {
      input: './javascript/app.js',
      output: './build/javascript/app.js',
      format: 'iife'
    }
  }


  /**
   * JS Bundler
   */
  const roll = () => {
    return rollup({
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
  }



  /**
   * Patching
   */
  const bumper = () => {
    return src('./package.json')
      .pipe(bump())
      .pipe(dest('./'));
  }


  /**
   * Styles
   */
  const styles = () => {
    return src(cfg.src.sass)
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
  }




  /**
   * Scripts
   */
  const scripts = () => {
    return src(cfg.src.jsBuild)
      .pipe(connect.reload());
  }



  /**
   * Images
   */
  const images = () => {
    return src(cfg.src.img)
      .pipe(connect.reload());
  }


  /**
   * HTML
   */
  const html = () => {
    return src(cfg.src.html)
      .pipe(connect.reload())
  }

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
  }

  /**
   * Open Default Browser
   */
  const openBrowser = () => {
    return src(cfg.server.src)
      .pipe(plumber())
      .pipe(open({
        uri: cfg.server.uri
      }));
  }

  /**
   * Watcher
   */
  const watcher = () => {
    watch(cfg.src.sass, styles);
    watch(cfg.src.jsBuild, scripts);
    watch(cfg.src.img, images);
    watch(cfg.src.html, html);
    watch(cfg.src.js, roll);
  }


  /**
   * Tests
   */
  const validateHtml = () => {
    return src(cfg.src.html)
      .pipe(plumber())
      .pipe(htmlValidator())
      .on('error', notify.onError());
  }

  // Development Tasks
  exports.default = parallel(roll, styles, scripts, images, html, openServer, openBrowser, watcher);

  // Test Tasks
  exports.test = parallel(validateHtml);
})();

/**
 * Styles
 * ================================================================================
 */

import gulp from 'gulp';
const { src, dest } = gulp;

/**
 * System
 */
import connect from 'gulp-connect';


/**
 * Notification
 */
import plumber from 'gulp-plumber';
import size from 'gulp-size';

/**
 * Styles
 */
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';

/**
 * Compressor
 */
import cssnano from 'cssnano';

/**
 * Source Map
 */
import sourcemaps from 'gulp-sourcemaps';

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';


/**
 * Config
 */
const cfg = {
  src: {
    scss: './src/scss/**/*.scss',
    css: './src/styles/**/*.css',
  },
  dest: {
    scss: './src/styles/',
    css: './dist/styles/',
  }
};

/**
 * Styles
 *
 * @description Compile SCSS to CSS
 */
const scss = () =>
  src(cfg.src.scss)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        style: 'expanded',
        outputStyle: 'expanded', // for support
        errLogToConsole: false,
        loadPaths: ['node_modules', 'bower_components', 'src', '.'],
        includePaths: ['node_modules', 'src', '.'], // for support
        silenceDeprecations: ['import'],
        quietDeps: true,
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest(cfg.dest.scss))
    .pipe(dest(cfg.dest.css))

/**
 * Styles Reload
 */
const stylesReload = (done) =>
  src(cfg.dest.scss)
    .pipe(connect.reload())
    .on('end', done);

/**
 * PostCSS, Autoprefixer, CSS compressor
 */
const cssCompress = (done) =>
  src('./dist/styles/**/*.css')
    .pipe(plumber({ errorHandler }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('./build/styles/'))
    .pipe(size({
      title: '[Styles]',
      showFiles: true,
    }))
    .pipe(connect.reload())
    .on('end', done);

export { scss, cssCompress, stylesReload };

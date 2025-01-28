import gulp from 'gulp';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import cached from 'gulp-cached';
import remember from 'gulp-remember';
import { errorHandler } from './lib/utils.js';

const { src, dest } = gulp;

/**
 * Common pipeline for file copying tasks.
 * Includes caching, error handling, and live reload.
 *
 * @param {Object} stream - Gulp stream to process
 * @param {string} cacheKey - Unique identifier for the cache
 * @returns {Object} Processed gulp stream
 */
const commonPipes = (stream, cacheKey) => stream
  .pipe(plumber({ errorHandler }))
  .pipe(cached(cacheKey))
  .pipe(newer('./dist/'))
  .pipe(remember(cacheKey))
  .pipe(connect.reload());

/**
 * Copies test files to the distribution directory
 * @returns {Object} Gulp stream
 */
const copyTest = () =>
  commonPipes(
    src('./src/test/**/*')
      .pipe(dest('./dist/test/')),
    'test'
  );

/**
 * Copies static files (redirects, headers, robots.txt, favicon)
 * to the distribution directory
 * @returns {Object} Gulp stream
 */
const copyFiles = () =>
  commonPipes(
    src([
      './src/_redirects',
      './src/_headers',
      './src/robots.txt',
      './src/favicon.ico',
    ])
      .pipe(dest('./dist/')),
    'files'
  );

/**
 * Copies all distribution files to the build directory.
 * Does not use caching as it's a final build step.
 * @returns {Object} Gulp stream
 */
const copyBuildFiles = () =>
  src(['./dist/**/*'])
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./build/'));

/**
 * Copies video files to the distribution directory
 * @returns {Object} Gulp stream
 */
const copyVideo = () =>
  commonPipes(
    src('./src/video/**/*')
      .pipe(dest('./dist/video/')),
    'video'
  );

/**
 * Copies font files to the distribution directory
 * @returns {Object} Gulp stream
 */
const copyFonts = () =>
  commonPipes(
    src('./src/fonts/**/*')
      .pipe(dest('./dist/fonts/')),
    'fonts'
  );

/**
 * Copies favicon files to the distribution directory
 * @returns {Object} Gulp stream
 */
const copyIcons = () =>
  commonPipes(
    src('./src/favicons/**/*')
      .pipe(dest('./dist/favicons/')),
    'icons'
  );

/**
 * Copies report files to the distribution directory
 * @returns {Object} Gulp stream
 */
const copyReport = () =>
  commonPipes(
    src('./src/report/**/*')
      .pipe(dest('./dist/report/')),
    'report'
  );

/**
 * Export all copy tasks.
 * Each task is a function that can be used in gulp.series() or gulp.parallel()
 *
 * @example
 * import { copyFiles, copyFonts } from './copy-tasks.js';
 * export default gulp.series(copyFiles, copyFonts);
 */
export {
  copyTest,
  copyFiles,
  copyBuildFiles,
  copyVideo,
  copyFonts,
  copyIcons,
  copyReport
};

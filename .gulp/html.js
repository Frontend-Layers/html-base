/**
 * HTML
 * ================================================================================
 */

import gulp from 'gulp';
const { src, dest } = gulp;

/**
 * HTML
 */
import tpl from 'gulp-nunjucks-render';
import { htmlValidator } from 'gulp-w3c-html-validator';
import htmlTest from 'html-test';
import htmlPreview from 'html-pages-preview';

/**
 * Server
 */
import connect from 'gulp-connect';

/**
 * Notification
 */
import plumber from 'gulp-plumber';

/**
 * Prettifier
 */
import prettify from 'gulp-prettify';

/**
 * Compressors
 */
import htmlMin from 'gulp-htmlmin';

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';

/**
 * Generate HTML preview pages
 */
const htmlPagesPreview = (done) => {
  const src = [
    './dist/home.html'
  ];
  const dest = './dist/preview-pages.html';

  htmlPreview(src, dest);
  done();
};

/**
 * Generate and beautify HTML templates
 */
const htmlGenerate = () =>
  src('./src/**/*.html')
    .pipe(plumber({ errorHandler }))
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
    .pipe(dest('./dist'));

/**
 * HTML Reload
 */
const htmlReload = (done) =>
  src('./dist/**/*.html')
    .pipe(connect.reload())
    .on('end', done);

/**
 * HTML Minify
 */
const htmlCompress = (done) =>
  src('./dist/*.html')
    .pipe(plumber({ errorHandler }))
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      })
    )
    .pipe(dest('./build/'))
    .pipe(connect.reload())
    .on('end', done);

/**
 * Rapid HTML Validator
 */
const testHtml = (done) => {
  htmlTest('./dist/**/*.html', { ignore: ['dist/test/**', 'dist/javascript/**', 'node_modules/**'] });
  done();
};

/**
 * Detailed Validate HTML
 */
const validateHtml = (done) =>
  src('./dist/*.html')
    .pipe(plumber({ errorHandler }))
    .pipe(htmlValidator.analyzer({
      ignoreLevel: "warning"
    }))
    .pipe(htmlValidator.reporter())
    .on('end', done);

export { htmlGenerate, htmlReload, htmlCompress, validateHtml, testHtml, htmlPagesPreview };

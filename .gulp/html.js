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
import notify from 'gulp-notify';

/**
 * Prettifier
 */
import prettify from 'gulp-prettify';

/**
 * Compressors
 */
import htmlmin from 'gulp-htmlmin';


/**
 * Pages Preview Generator
 */
const htmlPagesPreview = (c) => {
  const src = [
    './dist/home.html',
    './dist/article.html',
    './dist/product.html'
  ];
  const dest = './dist/preview-pages.html';

  htmlPreview(src, dest);

  return c();
};

/**
 * HTML Template Sytem + Beautifier
 */
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
    .pipe(dest('./dist'));

/**
 * Refresh HTML after src update
 */
const htmlReload = () => src('./dist/**/*.html').pipe(connect.reload());

/**
 * HTML Minify
 */
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
    .pipe(connect.reload());


/**
 * Fast Validate HTML
 */

const testHtml = () =>
  htmlTest('./dist/**/*.html', { ignore: ['dist/javascript/**', 'node_modules/**'] });

/**
 * Detailed Validate HTML
 */
const validateHtml = () =>
  src('./dist/*.html')
    .pipe(plumber())
    .pipe(htmlValidator.analyzer({
      ignoreLevel: "warning"
    }))
    .pipe(htmlValidator.reporter())
    .on('error', notify.onError());

export { htmlGenerate, htmlReload, htmlCompress, validateHtml, testHtml, htmlPagesPreview };

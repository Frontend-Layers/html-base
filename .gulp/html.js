import gulp from 'gulp';
import tpl from 'gulp-nunjucks-render';
import { htmlValidator } from 'gulp-w3c-html-validator';
import htmlTest from 'html-test';
import htmlPreview from 'html-pages-preview';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import prettify from 'gulp-prettify';
import htmlMin from 'gulp-htmlmin';
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import path from 'path';
// import debug from 'gulp-debug';

import size from 'gulp-size';


import { errorHandler } from './lib/utils.js';

const __dirname = path.resolve(path.dirname(''));

const { src, dest } = gulp;
const cfgPlumber = { errorHandler };

const htmlPagesPreview = (done) => {
  const srcFiles = [`${__dirname}/src/home.html`];
  const destFile = `${__dirname}/src/report/preview-pages.html`;
  htmlPreview(srcFiles, destFile);
  done();
};

const htmlGenerate = () =>
  src([
    './src/**/*.html',
    '!./src/report/**',
    '!./src/test/**',
    '!./src/javascript/**',
    '!./src/node_modules/**',
  ])
    .pipe(plumber(cfgPlumber))
    .pipe(cached('html'))
    .pipe(changed('./dist'))
    // .pipe(debug({ title: '[Nunjucks]' }))
    .pipe(tpl({ path: ['./src/'] }))
    .pipe(
      prettify({
        indent_inner_html: true,
        indent_size: 2,
        unformatted: ['pre', 'code'],
      })
    )
    .pipe(dest('./dist'))

const htmlReload = () =>
  src('./dist/**/*.html')
    .pipe(connect.reload());

const htmlCompress = (done) =>
  src('./dist/*.html')
    .pipe(plumber(cfgPlumber))
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      })
    )
    .pipe(dest('./build/'))
    .pipe(size({
      title: '[HTML]',
      showFiles: true,
    }))
    .pipe(connect.reload())
    .on('end', done);

const testHtml = (done) => {
  htmlTest('./dist/**/*.html', {
    ignore: [
      'dist/test/**',
      'dist/javascript/**',
      'node_modules/**'
    ]
  });
  done();
};

const validateHtml = () =>
  src('./dist/*.html')
    .pipe(plumber(cfgPlumber))
    .pipe(htmlValidator.analyzer({
      ignoreLevel: "warning"
    }))
    .pipe(htmlValidator.reporter());

export {
  htmlGenerate,
  htmlReload,
  htmlCompress,
  validateHtml,
  testHtml,
  htmlPagesPreview
};

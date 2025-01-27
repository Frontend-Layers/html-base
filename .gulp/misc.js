import gulp from 'gulp';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';
import newer from 'gulp-newer';
import cached from 'gulp-cached';

import { errorHandler } from './lib/utils.js';

const { src, dest } = gulp;

const commonPipes = (stream) => stream
  .pipe(cached('files'))
  .pipe(newer('./dist/'))
  .pipe(plumber({ errorHandler }))
  .pipe(connect.reload());

const copyTest = () =>
  commonPipes(
    src('./src/test/**/*')
      .pipe(dest('./dist/test/'))
  );

const copyFiles = () =>
  commonPipes(
    src([
      './src/_redirects',
      './src/_headers',
      './src/robots.txt',
      './src/favicon.ico',
    ])
      .pipe(dest('./dist/'))
  );

const copyBuildFiles = () =>
  src(['./dist/**/*'])
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./build/'));

const copyVideo = () =>
  commonPipes(
    src('./src/video/**/*')
      .pipe(dest('./dist/video/'))
  );

const copyFonts = () =>
  commonPipes(
    src('./src/fonts/**/*')
      .pipe(dest('./dist/fonts/'))
  );

const copyIcons = () =>
  commonPipes(
    src('./src/favicons/**/*')
      .pipe(dest('./dist/favicons/'))
  );

const copyReport = () =>
  commonPipes(
    src('./src/report/**/*')
      .pipe(dest('./dist/report/'))
  );


export {
  copyTest,
  copyFiles,
  copyBuildFiles,
  copyVideo,
  copyFonts,
  copyIcons,
  copyReport
};

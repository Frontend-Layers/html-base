import gulp from 'gulp';
import connect from 'gulp-connect';
import plumber from 'gulp-plumber';

/**
 * Custom
 */
import { errorHandler } from './lib/utils.js';

const { src, dest } = gulp;

const copyTest = () =>
  src('./src/test/**/*')
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./dist/test/'))
    .pipe(connect.reload())


const copyFiles = () =>
  src([
    './src/_redirects',
    './src/_headers',
    './src/robots.txt',
    './src/favicon.ico',
  ])
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./dist/'))


const copyBuildFiles = () =>
  src(['./dist/**/*'])
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./build/'))


const copyVideo = () =>
  src('./src/video/**/*')
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./dist/video/'))
    .pipe(connect.reload())


const copyFonts = () =>
  src('./src/fonts/**/*')
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./dist/fonts/'))
    .pipe(connect.reload())


const copyIcons = () =>
  src('./src/favicons/**/*')
    .pipe(plumber({ errorHandler }))
    .pipe(dest('./dist/favicons/'))
    .pipe(connect.reload())

export { copyTest, copyFiles, copyBuildFiles, copyVideo, copyFonts, copyIcons };

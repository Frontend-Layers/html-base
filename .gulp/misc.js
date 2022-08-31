import gulp from 'gulp';
const { src, dest } = gulp

import connect from 'gulp-connect'

const copyFiles = () =>
  src(
    [
      './src/_redirects',
      './src/_headers',
      './src/robots.txt',
      './src/favicon.ico',
    ],
    {
      allowEmpty: true,
    }
  )
    .pipe(dest('./dist/'))
    .pipe(connect.reload())

const copyBuildFiles = () =>
  src(['./dist/**/*'], {
    allowEmpty: true,
  }).pipe(dest('./build/'))

const copyVideo = () =>
  src('./src/video/**/*').pipe(dest('./dist/video/')).pipe(connect.reload())

const copyFonts = () =>
  src('./src/fonts/**/*').pipe(dest('./dist/fonts/')).pipe(connect.reload())

const copyIcons = () =>
  src('./src/favicons/**/*')
    .pipe(dest('./dist/favicons/'))
    .pipe(connect.reload())

export { copyFiles, copyBuildFiles, copyVideo, copyFonts, copyIcons }

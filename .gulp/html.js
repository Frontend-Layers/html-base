/**
 * HTML
 * ================================================================================
 */

import gulp from 'gulp'
const { src, dest } = gulp

/**
 * HTML
 */
import tpl from 'gulp-nunjucks-render'
import { htmlValidator } from 'gulp-w3c-html-validator'
import htmlTest from 'html-test'

/**
 * Server
 */
import connect from 'gulp-connect'

/**
 * Notification
 */
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

/**
 * Prettifier
 */
import prettify from 'gulp-prettify'

/**
 * Compressors
 */
import htmlmin from 'gulp-htmlmin'


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
    .pipe(dest('./dist'))

/**
 * Refresh HTML after src update
 */
const htmlRefresh = () => src('./dist/**/*.html').pipe(connect.reload())

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
    .pipe(connect.reload())


/**
 * Fast Validate HTML
 */

const testHtml = () =>
  htmlTest('./dist/**/*.html')

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
    .on('error', notify.onError())

export { htmlGenerate, htmlRefresh, htmlCompress, validateHtml, testHtml }

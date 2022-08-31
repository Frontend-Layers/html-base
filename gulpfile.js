/**
 * Load Modules
 * ================================================================================
 */

import gulp from 'gulp';
const { src, dest, parallel, series, watch } = gulp

// Styles
import { scss, cssCompress } from './.gulp/styles.js'

// JavaScript
import { roll, scripts, compressJS } from './.gulp/javascript.js'

// HTML
import { htmlGenerate, htmlRefresh, htmlCompress, validateHtml } from './.gulp/html.js'

// Images
import { imagesCompress, webpCompress, genSvgSprite, imgCopy } from './.gulp/images.js'

// Server
import { openServer, openBrowser, bumper, clean, cleanDist } from './.gulp/server.js'

// Misc
import { copyFiles, copyBuildFiles, copyVideo, copyFonts, copyIcons } from './.gulp/misc.js'


/**
 * System
 */
import concat from 'gulp-concat'


/**
 * Settings
 * ================================================================================
 */


/**
 * JS Libraries appending
 */
const jsVendorList = {
  src: ['./dist/javascript/app.js'],
}

const jsVendorLibs = () =>
  src(jsVendorList.src)
    .pipe(concat('app.js'))
    .pipe(dest('./dist/javascript/'))


/**
 * Tasks
 * ================================================================================
 */


/**
 * Watcher
 */
const watcher = () => {
  watch('./src/scss/**/*.scss', scss)
  watch('./src/**/*.html', series(htmlGenerate, cleanDist, htmlRefresh))
  watch('./src/javascript/**/*.js', series(series(roll, jsVendorLibs), scripts))
  watch('./src/images/**/*', imgCopy)
  watch('./src/favicons/**/*', copyIcons)
  watch('./src/fonts/**/*', copyFonts)
  watch('./src/video/**/*', copyVideo)
}


/**
 * Default Tasks
 */
export default series(
  parallel(
    copyFiles,
    copyVideo,
    copyFonts,
    copyIcons,
    series(series(roll, jsVendorLibs)),
    series(scss),
    series(imgCopy),
    series(htmlGenerate, cleanDist, openBrowser, validateHtml),
    openServer,
    watcher
  )
)

/**
 * Test Tasks
 */

const test = parallel(validateHtml)

/**
 * Build Tasks
 */
const build = series(
  clean,
  copyBuildFiles,
  parallel(
    series(series(roll, jsVendorLibs), compressJS),
    series(scss, cssCompress),
    series(imgCopy),
    series(htmlGenerate, cleanDist, htmlCompress)
  ),
  bumper
)

/**
 * Generate Compressed Images
 */
const images = series(imagesCompress, webpCompress)

/**
 * Generate SVG Sprite
 */
const svgSprite = series(genSvgSprite)

// Generate HTML
const html = series(htmlGenerate, cleanDist)

export { test, build, images, svgSprite, html }

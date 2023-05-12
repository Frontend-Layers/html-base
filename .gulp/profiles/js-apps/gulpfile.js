/**
 * Load Modules
 * ================================================================================
 */

import gulp from 'gulp';

// Styles
import { scss, cssCompress, stylesReload } from './.gulp/styles.js';

// JavaScript
import { roll, rollES, rollUMD, scriptsReload, compressJS } from './.gulp/javascript.js';

// HTML
import { htmlGenerate, htmlReload, testHtml } from './.gulp/html.js';

// Images
import { imagesCompress, webpCompress, genSvgSprite, imgCopy } from './.gulp/images.js';

// Server
import { openServer, openBrowser, bumper, clean, cleanDist } from './.gulp/server.js';

// Misc
import { copyFiles, copyBuildFiles, copyVideo, copyFonts, copyIcons } from './.gulp/misc.js';

// Tests
import { mobileTestRes, htmlSpeedRes, cssTestRes } from './.gulp/tests.js';

/**
 * @todo Tasks
 * @todo Statistics
 */

/**
 * System
 */
import concat from 'gulp-concat';
const { src, dest, parallel, series, watch } = gulp;

/**
 * Settings
 * ================================================================================
 */

/**
 * JS Libraries appending
 */
const jsVendorList = {
  src: ['./dist/javascript/app.js']
};

const jsVendorLibs = () =>
  src(jsVendorList.src)
    .pipe(concat('app.js'))
    .pipe(dest('./dist/javascript/'));

/**
 * Tasks
 * ================================================================================
 */

/**
 * Watcher
 */
const watcher = () => {
  watch('./src/scss/**/*.scss', series(scss, cssCompress, stylesReload, scriptsReload));
  watch('./src/**/*.html', series(htmlGenerate, cleanDist, htmlReload, testHtml, scriptsReload));
  watch('./src/javascript/**/*.js', series(series(parallel(roll), jsVendorLibs), scriptsReload));
  watch('./src/images/**/*', imgCopy);
  watch('./src/favicons/**/*', copyIcons);
  watch('./src/fonts/**/*', copyFonts);
  watch('./src/video/**/*', copyVideo);
};

/**
 * Default Tasks
 */
export default series(
  clean,
  parallel(
    copyFiles,
    copyVideo,
    copyFonts,
    copyIcons,
    series(
      series(htmlGenerate, cleanDist, openBrowser),
      series(scss, cssCompress),
      series(series(parallel(roll, rollES, rollUMD), jsVendorLibs), compressJS)
    ),
    series(imgCopy),
    openServer,
    watcher
  )
);

/**
 * Test Tasks
 */
const test = parallel(mobileTestRes, htmlSpeedRes, cssTestRes);

/**
 * Build Tasks
 */
const build = series(
  clean,
  copyBuildFiles,
  parallel(
    series(htmlGenerate, cleanDist),
    series(series(parallel(roll, rollES, rollUMD), jsVendorLibs), compressJS),
    series(scss, cssCompress),
    series(imgCopy)
  ),
  bumper
);

/**
 * Generate Compressed Images
 */
const images = series(imagesCompress, webpCompress);

/**
 * Generate SVG Sprite
 */
const sprite = series(genSvgSprite);

export { test, build, images, sprite };

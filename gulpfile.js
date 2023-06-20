/**
 * Load Modules
 * ================================================================================
 */
import gulp from 'gulp';

// Styles
import { scss, cssCompress, stylesReload } from './.gulp/styles.js';

// JavaScript
import { roll, scriptsReload, compressJS } from './.gulp/javascript.js';

// HTML
import { htmlGenerate, htmlReload, htmlCompress, validateHtml, testHtml, htmlPagesPreview } from './.gulp/html.js';

// Images
import { webpCompress, genSvgSprite, imgCopy } from './.gulp/images.js';

// Server
import { openServer, openBrowser, bumper, cleanBuild, cleanDist, cleanHTML, openProxyTunnel } from './.gulp/server.js';

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
 * Start
 */

// Clear shell screen
console.clear();

/**
 * Settings
 * ================================================================================
 */

/**
 * JS Libraries List
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
  watch('./src/scss/**/*.scss', series(scss, stylesReload));
  watch('./src/**/*.html', series(htmlGenerate, cleanHTML, htmlReload, testHtml));
  watch('./src/javascript/**/*.js', series(series(roll, jsVendorLibs), scriptsReload));
  watch('./src/images/**/*', series(webpCompress, imgCopy));
  watch('./src/favicons/**/*', copyIcons);
  watch('./src/fonts/**/*', copyFonts);
  watch('./src/video/**/*', copyVideo);
};

/**
 * Default Tasks
 */
export default series(
  cleanDist,
  cleanBuild,
  parallel(
    copyFiles,
    copyVideo,
    copyFonts,
    copyIcons,
    series(series(roll, jsVendorLibs)),
    series(scss),
    series(webpCompress, imgCopy),
    series(htmlGenerate, cleanHTML, openBrowser, htmlPagesPreview, validateHtml),
    openServer,
    openProxyTunnel,
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
  cleanDist,
  cleanBuild,
  copyBuildFiles,
  parallel(
    series(series(roll, jsVendorLibs), compressJS),
    series(scss, cssCompress),
    series(webpCompress, imgCopy),
    series(htmlGenerate, cleanHTML, htmlCompress)
  ),
  bumper
);

/**
 * Generate Images
 */
const images = series(webpCompress, imgCopy);

/**
 * Generate SVG Sprite
 */
const sprite = series(genSvgSprite);

export { test, build, images, sprite };

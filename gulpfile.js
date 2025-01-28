/**
 * Load Modules
 * ================================================================================
 */
import gulp from 'gulp';

/**
 * Load Tasks
 */

// Styles
import { scss, cssCompress, stylesReload } from './.gulp/styles.js';

// JavaScript
import { roll, scriptsReload, compressJS, jsConcatVendorLibs } from './.gulp/javascript.js';

// HTML
import { htmlGenerate, htmlReload, htmlCompress, validateHtml, testHtml, htmlPagesPreview } from './.gulp/html.js';

// Images
import { webpCompress, copyImages } from './.gulp/images.js';
import getSprite from './.gulp/sprite.js';

// Server
import { openServer, openBrowser, bumper, cleanBuild, cleanDist, cleanHTML, openProxyTunnel, bs } from './.gulp/server.js';

// Misc
import { copyTest, copyFiles, copyBuildFiles, copyVideo, copyFonts, copyIcons, copyReport } from './.gulp/misc.js';

// Tests
import { mobileTestRes, htmlSpeedRes, cssTestRes } from './.gulp/tests.js';

/**
 * @todo Tasks
 * @todo Statistics
 */

/**
 * System
 */
const { parallel, series, watch } = gulp;

/**
 * Start
 */



// Disable deprecation warnings
process.noDeprecation = true;

// Increase event listener limit
process.setMaxListeners(0);

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
  src: [
    // './node_modules/jquery/dist/jquery.min.js',
    './dist/javascript/app.js'
  ]
};

const concatJsLibs = (done) => jsConcatVendorLibs(jsVendorList, done);

/**
 * Tasks
 * ================================================================================
 */

/**
 * Watcher
 */

const cfgWatch = {
  usePolling: true,
  interval: 500,
  ignoreInitial: true
};

const watcher = (done) => {
  watch('./src/scss/**/*.scss', cfgWatch, series(scss, stylesReload));
  watch('./src/**/*.html', cfgWatch, series(htmlGenerate, cleanHTML, htmlReload, testHtml));
  watch('./src/javascript/**/*.js', cfgWatch, series(series(roll, concatJsLibs), scriptsReload));
  watch('./src/images/**/*', cfgWatch, series(webpCompress, copyImages));
  watch('./src/favicons/**/*', cfgWatch, series(copyIcons));
  watch('./src/fonts/**/*', cfgWatch, series(copyFonts));
  watch('./src/video/**/*', cfgWatch, series(copyVideo));
  watch('./src/test/**/*', cfgWatch, series(copyTest));
  watch('./src/report/**/*', cfgWatch, series(copyReport));
  done();
};

/**
 * Default Tasks
 */
export default series(
  cleanDist,
  cleanBuild,
  copyFiles,
  copyVideo,
  copyFonts,
  copyIcons,
  copyTest,
  parallel(
    series(series(roll, concatJsLibs)),
    series(scss),
    series(webpCompress, copyImages),
    series(htmlGenerate, cleanHTML, openBrowser, htmlPagesPreview),
    openServer,
    openProxyTunnel,
    watcher
  )
);

/**
 * Test Tasks
 */
const test = parallel(mobileTestRes, htmlSpeedRes, cssTestRes, validateHtml);

/**
 * Build Tasks
 */
const build = series(
  cleanDist,
  cleanBuild,
  copyBuildFiles,
  parallel(
    series(series(roll, concatJsLibs, compressJS)),
    series(scss, cssCompress),
    series(webpCompress, copyImages),
    series(htmlGenerate, cleanHTML, htmlCompress)
  ),
  bumper
);

/**
 * Generate Images
 */
const images = series(webpCompress, copyImages);

/**
 * Generate SVG Sprite
 */
const sprite = series(getSprite);

export { test, build, images, sprite };

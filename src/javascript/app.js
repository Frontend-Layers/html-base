/**
 * Load methods, helpers, polyfills etc.
 */

import domReady from 'js-components-npm/src/utils/domready';
// import Parallax from 'js-components-npm/src/utils/parallax';
import NoJs from 'js-components-npm/src/utils/no-js';
import ModuleClass from 'src/module-class';
import Component from 'src/components/component';

// Check JS is enabled
NoJs();

/**
 * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
 * without waiting for stylesheets, images, and subframes to finish loading.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
 */
domReady(() => {
  Component();

  // Test Class
  const obj = new ModuleClass();
  obj.method();
});

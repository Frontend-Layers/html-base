/**
 * Load methods, helpers, polyfills etc.
 */

import domReady from 'vendor/js-components-npm/src/methods/domready';

import ModuleClass from 'src/module-class';
import component from 'src/components/component';

/**
 * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
 * without waiting for stylesheets, images, and subframes to finish loading.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
 */
domReady(() => {
  component();

  // Test Class
  const obj = new ModuleClass;
  obj.method();

  console.log('ddd');
});

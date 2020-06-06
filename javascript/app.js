/**
 * Load methods, helpers, polyfills etc.
 */
import ModuleClass from 'App/module-class';
import component from 'App/components/component';


/**
 * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
 * without waiting for stylesheets, images, and subframes to finish loading.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
 */
document.addEventListener('DOMContentLoaded', () => {

  component();

  // Test Class
  const obj = new ModuleClass;
  obj.method();

});

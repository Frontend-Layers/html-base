/**
 * Load methods, helpers, polyfills etc.
 */
import method from './module';
import ModuleClass from './module-class';


/**
 * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
 * without waiting for stylesheets, images, and subframes to finish loading.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
 */
document.addEventListener('DOMContentLoaded', () => {

  // Test Method
  method();

  // Test Class
  const obj = new ModuleClass;
  obj.method();

});

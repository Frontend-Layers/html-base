(function () {
  'use strict';

  /**
   * Module
   */
  var module = function module() {
    console.log('Module');
  };

  /**
   * Load methods, helpers, polyfills etc.
   */
  /**
   * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, 
   * without waiting for stylesheets, images, and subframes to finish loading.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
   */

  document.addEventListener('DOMContentLoaded', function () {
    module();
  });

}());
//# sourceMappingURL=app.js.map

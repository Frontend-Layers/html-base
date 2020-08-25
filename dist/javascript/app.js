(function () {
  'use strict';

  /**
   *  Check if the document is loaded completely
   */
  var domReady = function domReady(callback) {
    // if already rendered
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback();
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * Module Class
   */
  var ModuleClass = function ModuleClass() {
    _classCallCheck(this, ModuleClass);

    _defineProperty(this, "method", function () {
      console.log('Class Render');
    });

    this.methodString = 'string';
    this.methodNumber = 0;
  };

  /**
   * Module
   */
  var module = function module() {
    console.log('Module');
  };

  /**
   * Module
   */

  var component = function component() {
    // Test Method
    module();
    console.log('Component');
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

  domReady(function () {
    component(); // Test Class

    var obj = new ModuleClass();
    obj.method();
    console.log('ddd');
  });

}());
//# sourceMappingURL=app.js.map

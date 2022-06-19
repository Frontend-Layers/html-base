(function () {
  'use strict';

  /**
   *  Check if the document is loaded completely
   */
  var domReady = function domReady(callback) {
    // if already rendered
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback();
  };

  /**
   * No js
   */
  var NoJs = function NoJs() {
    var root = document.getElementsByTagName('html')[0];
    root.classList.remove('no-js');
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
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
  var ModuleClass = /*#__PURE__*/_createClass(function ModuleClass() {
    _classCallCheck(this, ModuleClass);

    _defineProperty(this, "method", function () {
      console.log('Class Render');
    });

    this.methodString = 'string';
    this.methodNumber = 0;
  });

  /**
   * Module
   */
  var Module = function Module() {
    console.log('Module');
  };

  /**
   * Module
   */

  var Component = function Component() {
    // Test Method
    Module();
    console.log('Component');
  };

  /**
   * Load methods, helpers, polyfills etc.
   */

  NoJs();
  /**
   * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
   * without waiting for stylesheets, images, and subframes to finish loading.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
   */

  domReady(function () {
    Component(); // Test Class

    var obj = new ModuleClass();
    obj.method();
  });

})();

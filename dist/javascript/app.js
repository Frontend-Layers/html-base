(function () {
  'use strict';

  /**
   *  Check if the document is loaded completely
   */
  const domReady = (callback) => {
    // if already rendered
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', callback) : callback();
  };

  /**
   * No js
   */

  const NoJs = () => {
    const root = document.getElementsByTagName('html')[0];
    root.classList.remove('no-js');
  };

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  /**
   * Module Class
   */
  var ModuleClass = /*#__PURE__*/function () {
    function ModuleClass() {
      _classCallCheck(this, ModuleClass);
      this.methodString = 'string';
      this.methodNumber = 0;
    }
    return _createClass(ModuleClass, [{
      key: "method",
      value: function method() {
        console.log('Class Render');
      }
    }]);
  }();
  var name = 'James';
  var person = {
    first: name
  };
  console.log(person);

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
    Module();
    console.log('Component');
  };

  /**
   * Load methods, helpers, polyfills etc.
   */


  // import 'ui-explorer';

  // Check JS is enabled
  NoJs();

  /**
   * The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed,
   * without waiting for stylesheets, images, and subframes to finish loading.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
   */
  domReady(function () {
    /**
     * Test Component
     */
    Component();

    /**
     * Test Class
     */
    var obj = new ModuleClass();
    obj.method();
  });

})();
//# sourceMappingURL=app.js.map

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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
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
    _createClass(ModuleClass, [{
      key: "method",
      value: function method() {
        console.log('Class Render');
      }
    }]);
    return ModuleClass;
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

  var testJsonData = [
  	{
  		id: 1,
  		first_name: "Tammie",
  		last_name: "Ovenell",
  		email: "tovenell0@livejournal.com",
  		gender: "Male",
  		ip_address: "109.32.89.224",
  		company: "Abatz"
  	},
  	{
  		id: 2,
  		first_name: "Liam",
  		last_name: "Kelloch",
  		email: "lkelloch1@furl.net",
  		gender: "Male",
  		ip_address: "230.194.154.203",
  		company: "Jabbersphere"
  	},
  	{
  		id: 3,
  		first_name: "Garnet",
  		last_name: "Hedditeh",
  		email: "ghedditeh2@nyu.edu",
  		gender: "Female",
  		ip_address: "197.92.172.189",
  		company: "Gabtype"
  	},
  	{
  		id: 4,
  		first_name: "Ivar",
  		last_name: "Czapla",
  		email: "iczapla3@amazonaws.com",
  		gender: "Non-binary",
  		ip_address: "252.198.84.66",
  		company: "Gabvine"
  	},
  	{
  		id: 5,
  		first_name: "Billy",
  		last_name: "Stallard",
  		email: "bstallard4@apple.com",
  		gender: "Male",
  		ip_address: "241.220.202.221",
  		company: "Ainyx"
  	},
  	{
  		id: 6,
  		first_name: "Tommy",
  		last_name: "Whorlow",
  		email: "twhorlow5@oaic.gov.au",
  		gender: "Male",
  		ip_address: "129.115.225.239",
  		company: "Kazu"
  	},
  	{
  		id: 7,
  		first_name: "Liz",
  		last_name: "Leppard",
  		email: "lleppard6@infoseek.co.jp",
  		gender: "Female",
  		ip_address: "153.145.251.15",
  		company: "Brainbox"
  	},
  	{
  		id: 8,
  		first_name: "Aldric",
  		last_name: "Lingner",
  		email: "alingner7@privacy.gov.au",
  		gender: "Non-binary",
  		ip_address: "71.49.158.118",
  		company: "Linkbuzz"
  	},
  	{
  		id: 9,
  		first_name: "Torrence",
  		last_name: "Petlyura",
  		email: "tpetlyura8@mozilla.com",
  		gender: "Male",
  		ip_address: "217.21.124.15",
  		company: "Gevee"
  	},
  	{
  		id: 10,
  		first_name: "Bartie",
  		last_name: "Chaytor",
  		email: "bchaytor9@addtoany.com",
  		gender: "Male",
  		ip_address: "37.16.122.185",
  		company: "Yoveo"
  	}
  ];

  var testTemplate = "data:text/html;base64,PHRlbXBsYXRlIGlkPSJ0ZXN0LXRwbC1jYXJkIj4KICA8ZGl2IGlkPSJ0ZXN0LXRwbC1jYXJkIj4KICAgIDxoMyBpZD0idGVzdC10cGwtY2FyZCIgZGF0YS10cGwtc3JjPSJuYW1lIj5Mb3JlbSBUaXRsZTwvaDM+CgogICAgPGRpdj4KICAgICAgaWQ6ICR7aWR9CiAgICA8L2Rpdj4KICAgIDxkaXY+CiAgICAgIGVtYWlsOiAke2VtYWlsfQogICAgPC9kaXY+CiAgPC9kaXY+CjwvdGVtcGxhdGU+Cg==";

  var svg = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22iso-8859-1%22%3F%3E%3Csvg%20fill%3D%22%23000000%22%20height%3D%22800px%22%20width%3D%22800px%22%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20%20viewBox%3D%220%200%20512%20512%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%20%3Cg%3E%20%20%3Cpath%20d%3D%22M495.621%2C251.568c-7.215-13.201-17.229-23.018-26.064-31.678c-11.455-11.229-20.505-20.099-22.489-33.65%20%20%20c-7.519-51.325-33.412-98.451-72.911-132.697C334.334%2C19.015%2C283.328%2C0%2C230.533%2C0C109.794%2C0%2C11.566%2C98.228%2C11.566%2C218.967%20%20%20c0%2C50.851%2C20.073%2C101.159%2C53.694%2C134.576c5.344%2C5.311%2C11.566%2C9.837%2C18.347%2C13.717V512H314.22v-55.415h73.141%20%20%20c33.898%2C0%2C61.476-27.578%2C61.476-61.476v-85.806h12.429c13.951%2C0%2C26.532-7.169%2C33.654-19.177%20%20%20C502.016%2C278.164%2C502.277%2C263.75%2C495.621%2C251.568z%20M280.831%2C478.609H117v-29.826h43.915v-33.391H117v-34.766%20%20%20c25.772%2C7.024%2C53.072%2C8.692%2C71.718%2C8.825c9.105%2C0.066%2C17.646%2C4.566%2C22.849%2C12.039l20.004%2C28.739%20%20%20c11.26%2C16.175%2C29.606%2C25.936%2C49.261%2C26.319V478.609z%20M466.203%2C273.091c-0.626%2C1.053-2.097%2C2.82-4.935%2C2.82h-45.821v69.132h-46.55%20%20%20v33.391h46.55v16.673c0%2C15.486-12.599%2C28.084-28.084%2C28.084H282.026c-9.186%2C0-17.803-4.501-23.051-12.04l-20.004-28.739%20%20%20c-11.386-16.358-30.083-26.211-50.015-26.355c-46.544-0.333-83.986-10.128-100.157-26.2%20%20%20c-27.042-26.878-43.843-69.37-43.843-110.894c0.001-102.325%2C83.25-185.574%2C185.577-185.574c44.759%2C0%2C87.998%2C16.116%2C121.75%2C45.38%20%20%20c33.458%2C29.009%2C55.386%2C68.893%2C61.746%2C112.306c3.616%2C24.683%2C18.777%2C39.544%2C32.154%2C52.657c7.87%2C7.716%2C15.304%2C15.002%2C20.137%2C23.846%20%20%20C467.635%2C269.988%2C466.811%2C272.067%2C466.203%2C273.091z%22%2F%3E%20%3C%2Fg%3E%3C%2Fg%3E%3Cg%3E%20%3Cg%3E%20%20%3Cpath%20d%3D%22M192.195%2C92.807c-53.314%2C0-96.689%2C43.375-96.689%2C96.689s43.374%2C96.689%2C96.689%2C96.689%20%20%20c53.315%2C0%2C96.689-43.375%2C96.689-96.689S245.509%2C92.807%2C192.195%2C92.807z%20M175.5%2C250.543c-21.502-5.888-38.462-22.85-44.35-44.351%20%20%20h44.35V250.543z%20M175.5%2C172.8h-44.35c5.888-21.502%2C22.849-38.463%2C44.35-44.351V172.8z%20M208.891%2C250.543v-44.351h44.35%20%20%20C247.353%2C227.693%2C230.393%2C244.655%2C208.891%2C250.543z%20M208.891%2C172.8v-44.351c21.502%2C5.888%2C38.462%2C22.85%2C44.35%2C44.351H208.891z%22%2F%3E%20%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

  /**
   * Module
   */
  var ResourcesLoaderTest = function ResourcesLoaderTest() {
    console.log('testJsonData', testJsonData);
    console.log('SVG Loading test', svg);
    console.log('testTemplate', testTemplate);
  };

  /**
   * Load methods, helpers, polyfills etc.
   */

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
     * Test Resources Loader
     */
    ResourcesLoaderTest();

    /**
     * Test Class
     */
    var obj = new ModuleClass();
    obj.method();
  });

})();

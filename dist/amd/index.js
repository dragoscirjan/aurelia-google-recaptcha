define([
  'exports',
  'aurelia-pal',
  './recaptcha-base',
  './recaptcha',
  './recaptcha-v2',
  './recaptcha-v2-invisible'
], function(_exports, _aureliaPal, _recaptchaBase, _recaptcha, _recaptchaV, _recaptchaV2Invisible) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true
  });
  _exports.configure = configure;
  Object.defineProperty(_exports, 'getHash', {
    enumerable: true,
    get: function get() {
      return _recaptchaBase.getHash;
    }
  });
  Object.defineProperty(_exports, 'Recaptcha', {
    enumerable: true,
    get: function get() {
      return _recaptcha.Recaptcha;
    }
  });
  Object.defineProperty(_exports, 'RecaptchaV2', {
    enumerable: true,
    get: function get() {
      return _recaptchaV.RecaptchaV2;
    }
  });
  Object.defineProperty(_exports, 'RecaptchaV2Invisible', {
    enumerable: true,
    get: function get() {
      return _recaptchaV2Invisible.RecaptchaV2Invisible;
    }
  });
  _exports.Config = void 0;

  var Config = (function() {
    function Config() {}

    var _proto = Config.prototype;

    _proto.configure = function configure(aurelia) {
      aurelia.globalResources(_aureliaPal.PLATFORM.moduleName('./recaptcha'));
      aurelia.globalResources(_aureliaPal.PLATFORM.moduleName('./recaptcha-v2'));
      aurelia.globalResources(_aureliaPal.PLATFORM.moduleName('./recaptcha-v2-invisible'));
    };

    return Config;
  })();

  _exports.Config = Config;

  function configure(aurelia, callback) {
    if (callback === void 0) {
      callback = null;
    }

    var config = aurelia.container.get(Config);

    if (typeof callback === 'function') {
      callback(config);
    }

    config.configure(aurelia);
  }
});

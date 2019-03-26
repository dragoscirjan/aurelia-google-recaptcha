'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;
Object.defineProperty(exports, 'getHash', {
  enumerable: true,
  get: function get() {
    return _recaptchaBase.getHash;
  }
});
Object.defineProperty(exports, 'Recaptcha', {
  enumerable: true,
  get: function get() {
    return _recaptcha.Recaptcha;
  }
});
Object.defineProperty(exports, 'RecaptchaV2', {
  enumerable: true,
  get: function get() {
    return _recaptchaV.RecaptchaV2;
  }
});
Object.defineProperty(exports, 'RecaptchaV2Invisible', {
  enumerable: true,
  get: function get() {
    return _recaptchaV2Invisible.RecaptchaV2Invisible;
  }
});
exports.Config = void 0;

var _aureliaPal = require('aurelia-pal');

var _recaptchaBase = require('./recaptcha-base');

var _recaptcha = require('./recaptcha');

var _recaptchaV = require('./recaptcha-v2');

var _recaptchaV2Invisible = require('./recaptcha-v2-invisible');

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

exports.Config = Config;

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

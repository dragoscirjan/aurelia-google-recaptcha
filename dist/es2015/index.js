'use strict';

exports.__esModule = true;
exports.configure = configure;
exports.Config = void 0;

var _aureliaPal = require('aurelia-pal');

var _recaptchaBase = require('./recaptcha-base');

exports.getHash = _recaptchaBase.getHash;

var _recaptcha = require('./recaptcha');

exports.Recaptcha = _recaptcha.Recaptcha;

var _recaptchaV = require('./recaptcha-v2');

exports.RecaptchaV2 = _recaptchaV.RecaptchaV2;

var _recaptchaV2Invisible = require('./recaptcha-v2-invisible');

exports.RecaptchaV2Invisible = _recaptchaV2Invisible.RecaptchaV2Invisible;

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

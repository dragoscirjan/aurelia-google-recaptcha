"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;
Object.defineProperty(exports, "getHash", {
  enumerable: true,
  get: function get() {
    return _recaptchaBase.getHash;
  }
});
Object.defineProperty(exports, "Recaptcha", {
  enumerable: true,
  get: function get() {
    return _recaptcha.Recaptcha;
  }
});
Object.defineProperty(exports, "RecaptchaV2", {
  enumerable: true,
  get: function get() {
    return _recaptchaV.RecaptchaV2;
  }
});
Object.defineProperty(exports, "RecaptchaV2Invisible", {
  enumerable: true,
  get: function get() {
    return _recaptchaV2Invisible.RecaptchaV2Invisible;
  }
});

var _config = require("./config");

var _recaptchaBase = require("./recaptcha-base");

var _recaptcha = require("./recaptcha");

var _recaptchaV = require("./recaptcha-v2");

var _recaptchaV2Invisible = require("./recaptcha-v2-invisible");

function configure(aurelia, callback) {
  var config = aurelia.container.get(_config.Config);

  if (callback !== undefined && typeof callback === 'function') {
    callback(config);
  }

  config.configure(aurelia);
}
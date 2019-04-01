"use strict";

exports.__esModule = true;
exports.configure = configure;

var _config = require("./config");

var _recaptchaBase = require("./recaptcha-base");

exports.getHash = _recaptchaBase.getHash;

var _recaptcha = require("./recaptcha");

exports.Recaptcha = _recaptcha.Recaptcha;

var _recaptchaV = require("./recaptcha-v2");

exports.RecaptchaV2 = _recaptchaV.RecaptchaV2;

var _recaptchaV2Invisible = require("./recaptcha-v2-invisible");

exports.RecaptchaV2Invisible = _recaptchaV2Invisible.RecaptchaV2Invisible;

function configure(aurelia, callback) {
  var config = aurelia.container.get(_config.Config);

  if (callback !== undefined && typeof callback === 'function') {
    callback(config);
  }

  config.configure(aurelia);
}
define(["exports", "./config", "./recaptcha-base", "./recaptcha", "./recaptcha-v2", "./recaptcha-v2-invisible"], function (_exports, _config, _recaptchaBase, _recaptcha, _recaptchaV, _recaptchaV2Invisible) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.configure = configure;
  Object.defineProperty(_exports, "getHash", {
    enumerable: true,
    get: function get() {
      return _recaptchaBase.getHash;
    }
  });
  Object.defineProperty(_exports, "Recaptcha", {
    enumerable: true,
    get: function get() {
      return _recaptcha.Recaptcha;
    }
  });
  Object.defineProperty(_exports, "RecaptchaV2", {
    enumerable: true,
    get: function get() {
      return _recaptchaV.RecaptchaV2;
    }
  });
  Object.defineProperty(_exports, "RecaptchaV2Invisible", {
    enumerable: true,
    get: function get() {
      return _recaptchaV2Invisible.RecaptchaV2Invisible;
    }
  });

  function configure(aurelia, callback) {
    var config = aurelia.container.get(_config.Config);

    if (callback !== undefined && typeof callback === 'function') {
      callback(config);
    }

    config.configure(aurelia);
  }
});
"use strict";

System.register(["./config", "./recaptcha-base", "./recaptcha", "./recaptcha-v2", "./recaptcha-v2-invisible"], function (_export, _context) {
  "use strict";

  var Config, getHash, Recaptcha, RecaptchaV2, RecaptchaV2Invisible;

  function configure(aurelia, callback) {
    var config = aurelia.container.get(Config);

    if (callback !== undefined && typeof callback === 'function') {
      callback(config);
    }

    config.configure(aurelia);
  }

  _export("configure", configure);

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_recaptchaBase) {
      getHash = _recaptchaBase.getHash;
    }, function (_recaptcha) {
      Recaptcha = _recaptcha.Recaptcha;
    }, function (_recaptchaV) {
      RecaptchaV2 = _recaptchaV.RecaptchaV2;
    }, function (_recaptchaV2Invisible) {
      RecaptchaV2Invisible = _recaptchaV2Invisible.RecaptchaV2Invisible;
    }],
    execute: function () {
      _export("getHash", getHash);

      _export("Recaptcha", Recaptcha);

      _export("RecaptchaV2", RecaptchaV2);

      _export("RecaptchaV2Invisible", RecaptchaV2Invisible);
    }
  };
});
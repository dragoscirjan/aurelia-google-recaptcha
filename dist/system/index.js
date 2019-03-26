'use strict';

System.register(
  ['aurelia-pal', './recaptcha-base', './recaptcha', './recaptcha-v2', './recaptcha-v2-invisible'],
  function(_export, _context) {
    'use strict';

    var PLATFORM, getHash, Recaptcha, RecaptchaV2, RecaptchaV2Invisible, Config;

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

    _export('configure', configure);

    return {
      setters: [
        function(_aureliaPal) {
          PLATFORM = _aureliaPal.PLATFORM;
        },
        function(_recaptchaBase) {
          getHash = _recaptchaBase.getHash;
        },
        function(_recaptcha) {
          Recaptcha = _recaptcha.Recaptcha;
        },
        function(_recaptchaV) {
          RecaptchaV2 = _recaptchaV.RecaptchaV2;
        },
        function(_recaptchaV2Invisible) {
          RecaptchaV2Invisible = _recaptchaV2Invisible.RecaptchaV2Invisible;
        }
      ],
      execute: function() {
        _export(
          'Config',
          (Config = (function() {
            function Config() {}

            var _proto = Config.prototype;

            _proto.configure = function configure(aurelia) {
              aurelia.globalResources(PLATFORM.moduleName('./recaptcha'));
              aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2'));
              aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2-invisible'));
            };

            return Config;
          })())
        );

        _export('getHash', getHash);

        _export('Recaptcha', Recaptcha);

        _export('RecaptchaV2', RecaptchaV2);

        _export('RecaptchaV2Invisible', RecaptchaV2Invisible);
      }
    };
  }
);

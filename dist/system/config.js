"use strict";

System.register(["amaranth-utils", "aurelia-pal"], function (_export, _context) {
  "use strict";

  var extend, PLATFORM, Config;
  return {
    setters: [function (_amaranthUtils) {
      extend = _amaranthUtils.extend;
    }, function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }],
    execute: function () {
      /**
       * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
       *
       * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
       * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
       * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
       * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
       */
      _export("Config", Config = function () {
        function Config() {
          this.values = void 0;
          this.values = {
            siteKey: '',
            siteKeys: {
              v2: '',
              v2i: '',
              v3: ''
            },
            lang: 'en'
          };
        }

        var _proto = Config.prototype;

        _proto.configure = function configure(aurelia) {
          aurelia.globalResources(PLATFORM.moduleName('./recaptcha'));
          aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2'));
          aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2-invisible'));
        };

        _proto.all = function all() {
          return this.values;
        };

        _proto.assign = function assign(obj) {
          this.values = extend(this.values, obj);
        };

        _proto.get = function get(key) {
          var result = extend({}, this.values);

          for (var _iterator = key.split('.'), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var chunk = _ref;
            result = result ? result[chunk] || undefined : undefined;
          }

          return result;
        };

        _proto.set = function set(key, value) {
          chunks = key.split('.');

          if (chunks.length === 1) {
            this.values[key] = value;
            return this.values[key];
          }

          var part;

          while (chunks.length > 1) {
            part = part ? part[chunks.shift()] : this.values[chunks.shift()];
          }

          var lastKey = chunks.shift();
          part[lastKey] = value;
          return this.values[lastKey];
        };

        return Config;
      }());
    }
  };
});
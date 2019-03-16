System.register(['aurelia-framework'], function(_export) {
  /**
   * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
   *
   * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
   * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
   * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
   * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
   */

  'use strict';

  var inject, noView, bindable, recaptchaCallbackName, ready, script, Recaptcha;

  var _createDecoratedClass = (function() {
    function defineProperties(target, descriptors, initializers) {
      for (var i = 0; i < descriptors.length; i++) {
        var descriptor = descriptors[i];
        var decorators = descriptor.decorators;
        var key = descriptor.key;
        delete descriptor.key;
        delete descriptor.decorators;
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;
        if (decorators) {
          for (var f = 0; f < decorators.length; f++) {
            var decorator = decorators[f];
            if (typeof decorator === 'function') {
              descriptor = decorator(target, key, descriptor) || descriptor;
            } else {
              throw new TypeError(
                'The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator
              );
            }
          }
          if (descriptor.initializer !== undefined) {
            initializers[key] = descriptor;
            continue;
          }
        }
        Object.defineProperty(target, key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);
      if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);
      return Constructor;
    };
  })();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) {
    var _descriptor = descriptors[key];
    if (!_descriptor) return;
    var descriptor = {};
    for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];
    descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;
    Object.defineProperty(target, key, descriptor);
  }

  return {
    setters: [
      function(_aureliaFramework) {
        inject = _aureliaFramework.inject;
        noView = _aureliaFramework.noView;
        bindable = _aureliaFramework.bindable;
      }
    ],
    execute: function() {
      recaptchaCallbackName = 'setRecaptchaReady';
      ready = new Promise(function(resolve) {
        return (window[recaptchaCallbackName] = resolve);
      });
      script = document.createElement('script');

      script.src =
        'https://www.google.com/recaptcha/api.js?onload=' +
        recaptchaCallbackName +
        '&render=explicit&hl=' +
        (document.getElementsByTagName('html')[0].getAttribute('lang') || 'en');
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      Recaptcha = (function() {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(
          Recaptcha,
          [
            {
              key: 'callback',
              decorators: [bindable],
              initializer: null,
              enumerable: true
            },
            {
              key: 'expiredCallback',
              decorators: [bindable],
              initializer: null,
              enumerable: true
            },
            {
              key: 'size',
              decorators: [bindable],
              initializer: function initializer() {
                return 'normal';
              },
              enumerable: true
            },
            {
              key: 'tabindex',
              decorators: [bindable],
              initializer: function initializer() {
                return 0;
              },
              enumerable: true
            },
            {
              key: 'theme',
              decorators: [bindable],
              initializer: function initializer() {
                return 'light';
              },
              enumerable: true
            },
            {
              key: 'type',
              decorators: [bindable],
              initializer: function initializer() {
                return 'image';
              },
              enumerable: true
            },
            {
              key: 'sitekey',
              decorators: [bindable],
              initializer: function initializer() {
                return '';
              },
              enumerable: true
            }
          ],
          null,
          _instanceInitializers
        );

        function Recaptcha(element) {
          _classCallCheck(this, _Recaptcha);

          _defineDecoratedPropertyDescriptor(this, 'callback', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'expiredCallback', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'size', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'tabindex', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'theme', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'type', _instanceInitializers);

          _defineDecoratedPropertyDescriptor(this, 'sitekey', _instanceInitializers);

          this.element = element;
        }

        _createDecoratedClass(
          Recaptcha,
          [
            {
              key: 'attached',
              value: function attached() {
                var _this = this;

                ready.then(function() {
                  var self = _this;
                  grecaptcha.render(_this.element, {
                    callback:
                      typeof _this.callback === 'string'
                        ? function(result) {
                            if (window[self.callback]) {
                              window[self.callback].call(grecaptcha, result);
                              return;
                            }
                            throw new Error("callback '" + self.callback + "' does not exists");
                          }
                        : _this.callback,
                    'expired-callback':
                      typeof _this.expiredCallback === 'string'
                        ? function(result) {
                            if (window[self.expiredCallback]) {
                              window[self.expiredCallback].call(grecaptcha, result);
                              return;
                            }
                            throw new Error("callback '" + self.expiredCallback + "' does not exists");
                          }
                        : _this.expiredCallback,
                    sitekey: _this.sitekey,
                    size: _this.size,
                    tabindex: _this.tabindex,
                    theme: _this.theme,
                    type: _this.type
                  });
                });
              }
            }
          ],
          null,
          _instanceInitializers
        );

        var _Recaptcha = Recaptcha;
        Recaptcha = inject(Element)(Recaptcha) || Recaptcha;
        Recaptcha = noView()(Recaptcha) || Recaptcha;
        return Recaptcha;
      })();

      _export('Recaptcha', Recaptcha);
    }
  };
});

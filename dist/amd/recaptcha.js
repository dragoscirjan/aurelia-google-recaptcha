define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    /**
     * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
     *
     * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
     * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
     * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
     * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
     */

    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

    var recaptchaCallbackName = 'setRecaptchaReady';
    var ready = new Promise(function (resolve) {
        return window[recaptchaCallbackName] = resolve;
    });

    var script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=' + recaptchaCallbackName + '&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    var Recaptcha = (function () {
        var _instanceInitializers = {};
        var _instanceInitializers = {};

        _createDecoratedClass(Recaptcha, [{
            key: 'verified',
            decorators: [_aureliaFramework.bindable],
            initializer: null,
            enumerable: true
        }, {
            key: 'theme',
            decorators: [_aureliaFramework.bindable],
            initializer: function initializer() {
                return 'light';
            },
            enumerable: true
        }], null, _instanceInitializers);

        function Recaptcha(element) {
            _classCallCheck(this, _Recaptcha);

            _defineDecoratedPropertyDescriptor(this, 'verified', _instanceInitializers);

            _defineDecoratedPropertyDescriptor(this, 'theme', _instanceInitializers);

            this.element = element;
        }

        _createDecoratedClass(Recaptcha, [{
            key: 'attached',
            value: function attached() {
                var _this = this;

                ready.then(function () {
                    return grecaptcha.render(_this.element, {
                        sitekey: _this.sitekey,
                        theme: _this.theme,
                        callback: _this.verified
                    });
                });
            }
        }], null, _instanceInitializers);

        var _Recaptcha = Recaptcha;
        Recaptcha = (0, _aureliaFramework.inject)(Element)(Recaptcha) || Recaptcha;
        Recaptcha = (0, _aureliaFramework.noView)()(Recaptcha) || Recaptcha;
        return Recaptcha;
    })();

    exports.Recaptcha = Recaptcha;
});
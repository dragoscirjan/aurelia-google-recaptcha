'use strict';

System.register(['aurelia-framework', './recaptcha-v2'], function(_export, _context) {
  'use strict';

  var bindable,
    customElement,
    RecaptchaV2,
    _dec,
    _class,
    _class2,
    _descriptor,
    _descriptor2,
    _temp,
    RecaptchaV2Invisible;

  function _extends() {
    _extends =
      Object.assign ||
      function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    return _extends.apply(this, arguments);
  }

  function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function(key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }
    desc = decorators
      .slice()
      .reverse()
      .reduce(function(desc, decorator) {
        return decorator(target, property, desc) || desc;
      }, desc);
    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }
    if (desc.initializer === void 0) {
      Object.defineProperty(target, property, desc);
      desc = null;
    }
    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error(
      'Decorating class property failed. Please ensure that ' +
        'proposal-class-properties is enabled and set to use loose mode. ' +
        'To use proposal-class-properties in spec mode with decorators, wait for ' +
        'the next major version of decorators in stage 2.'
    );
  }

  _export({
    _dec: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _descriptor2: void 0,
    _temp: void 0
  });

  return {
    setters: [
      function(_aureliaFramework) {
        bindable = _aureliaFramework.bindable;
        customElement = _aureliaFramework.customElement;
      },
      function(_recaptchaV) {
        RecaptchaV2 = _recaptchaV.RecaptchaV2;
      }
    ],
    execute: function() {
      _export(
        'RecaptchaV2Invisible',
        (RecaptchaV2Invisible = ((_dec = customElement('recaptcha-v2-invisible')),
        _dec(
          (_class = ((_class2 = ((_temp = (function(_RecaptchaV) {
            _inheritsLoose(RecaptchaV2Invisible, _RecaptchaV);

            function RecaptchaV2Invisible() {
              var _this;

              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              _this = _RecaptchaV.call.apply(_RecaptchaV, [this].concat(args)) || this;

              _initializerDefineProperty(_this, 'badge', _descriptor, _assertThisInitialized(_this));

              _initializerDefineProperty(_this, 'isolated', _descriptor2, _assertThisInitialized(_this));

              return _this;
            }

            var _proto = RecaptchaV2Invisible.prototype;

            _proto.bind = function bind() {
              _RecaptchaV.prototype.bind && _RecaptchaV.prototype.bind.call(this);
              this.registerExecuteEvent();
            };

            _proto.attached = function attached() {
              _RecaptchaV.prototype.attached && _RecaptchaV.prototype.attached.call(this);
              this.registerExecuteWatcher();
            };

            _proto.recaptchaExecute = function recaptchaExecute() {
              grecaptcha.execute(this.widgetId);
            };

            _proto.renderOptions = function renderOptions() {
              return _extends({}, _RecaptchaV.prototype.renderOptions.call(this), {
                badge: this.badge,
                isolated: this.isolated,
                size: 'invisible'
              });
            };

            return RecaptchaV2Invisible;
          })(RecaptchaV2)),
          _temp)),
          ((_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'badge', [bindable], {
            configurable: true,
            enumerable: true,
            writable: true,
            initializer: function initializer() {
              return 'inline';
            }
          })),
          (_descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'isolated', [bindable], {
            configurable: true,
            enumerable: true,
            writable: true,
            initializer: function initializer() {
              return false;
            }
          }))),
          _class2))
        ) || _class))
      );
    }
  };
});

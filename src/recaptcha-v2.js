/**
 * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
 *
 * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
 * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
 * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
 * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
 */

import { bindable, customElement } from 'aurelia-framework';
import { getHash, RecaptchaBase } from './recaptcha-base';

let scriptReady = false;
const callbackName = `__recaptcha_callback_${getHash()}__`;
const callbackPromise = new Promise(
  resolve =>
    (window[callbackName] = () => {
      scriptReady = true;
      resolve();
    })
);

export class RecaptchaVerified /*extends Event*/ {
  constructor(component, token, widgetId) {
    // super('recaptcha-callback');

    this.component = component;
    this.grecaptcha = grecaptcha;
    this.token = token;
    this.widgetId = widgetId;
  }
}

export class RecaptchaError /*extends Event*/ {
  constructor(component, widgetId) {
    // super('recaptcha-callback-error');

    this.component = component;
    this.grecaptcha = grecaptcha;
    this.widgetId = widgetId;
  }
}

export class RecaptchaExpired /*extends Event*/ {
  constructor(component, widgetId) {
    // super('recaptcha-callback-expired');

    this.component = component;
    this.grecaptcha = grecaptcha;
    this.widgetId = widgetId;
  }
}

/**
 * Google Recaptcha plugin, originally developed by Jeremy Danyow (http://stackoverflow.com/users/725866/jeremy-danyow)
 * and extended by Dragos Cirjan (http://github.com/dragoscirjan)
 *
 * @link http://stackoverflow.com/questions/35441787/use-googles-recaptcha-in-an-aurelia-application
 * @link http://plnkr.co/edit/rXqNdh?p=info
 * @link https://developers.google.com/recaptcha/docs/display
 *
 * @method noView
 * @method inject
 */
@customElement('recaptcha-v2')
export class RecaptchaV2 extends RecaptchaBase {
  /** @var {Function|String} Optional. The name of your callback function, executed when the user submits a successful response. The g-recaptcha-response token is passed to your callback. */
  @bindable callback;

  /** @var {Function|String} Optional. The name of your callback function, executed when reCAPTCHA encounters an error (usually network connectivity) and cannot continue until connectivity is restored. If you specify a function here, you are responsible for informing the user that they should retry. */
  @bindable errorCallback;

  /** @var {Function|String} Optional. The name of your callback function, executed when the reCAPTCHA response expires and the user needs to re-verify. */
  @bindable expiredCallback;

  /** @var {String} Optional. The size of the widget. Values: compact, normal. Default: normal. */
  @bindable size = 'normal';

  /** @var {Number} Optional. The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier. */
  @bindable tabindex = 0;

  /** @var {String} Optional. The color theme of the widget. Values: dark, light. Default: light. */
  @bindable theme = 'light';

  /** @var {Number|null} ID oF widget, as per v2 of the recaptcha */
  widgetId = null;

  /**
   * Component Bind Handler
   */
  bind() {
    super.bind && super.bind();
    if (!this.sitekey) {
      this.sitekey = this.config.get('siteKeys.v2');
    }

    const lang = document.getElementsByTagName('html')[0].getAttribute('lang') || this.config.get('lang');
    const script = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit&hl=${lang}`;
    this.loadScript(this.getScriptId(), script);

    this.registerResetEvent();
  }

  /**
   * Component Attached Handler
   */
  attached() {
    super.attached && super.attached();

    this.render();
  }

  /**
   * Component Bind Reset Event
   */
  registerResetEvent() {
    const eventName = `grecaptcha:reset:${this.id}`;
    this.__auevents__[eventName] = this.events.subscribe(eventName, () => {
      this.logger.debug(`Triggered ${eventName}`);
      grecaptcha && grecaptcha.reset && grecaptcha.reset(this.widgetId);
      this.value = null;
    });
  }

  /**
   * Render Recaptcha
   */
  render() {
    if (!scriptReady) {
      return callbackPromise.then(() => this.render());
    }
    this.widgetId = grecaptcha.render(this.element, this.renderOptions());
  }

  /**
   * Obtain Recaptcha Render Options
   * @returns {{}}
   */
  renderOptions() {
    const callback = () => {
      if (this.widgetId !== null) {
        this.value = grecaptcha.getResponse(this.widgetId);
        this.logger.debug('reCAPTCHA callback', this.widgetId, this.value);
      }
      if (this.callback) {
        if (typeof this.callback === 'function') {
          return this.callback(new RecaptchaVerified(this, this.value, this.widgetId));
        }
        if (window[this.callback]) {
          return window[this.callback].call(null, new RecaptchaVerified(this, this.value, this.widgetId));
        }
      }
    };
    const errorCallback = () => {
      this.value = undefined;
      this.logger.debug('reCAPTCHA error-callback', this.widgetId);
      if (this.errorCallback) {
        if (typeof this.errorCallback === 'function') {
          return this.callback(new RecaptchaError(this, this.widgetId));
        }
        if (window[this.errorCallback]) {
          return window[this.errorCallback].call(null, new RecaptchaError(this, this.widgetId));
        }
      }
    };
    const expiredCallback = () => {
      this.value = undefined;
      this.logger.debug('reCAPTCHA expired-callback', this.widgetId);
      if (this.expiredCallback) {
        if (typeof this.expiredCallback === 'function') {
          return this.expiredCallback(new RecaptchaExpired(this, this.widgetId));
        }
        if (window[this.expiredCallback]) {
          return window[this.expiredCallback].call(null, new RecaptchaExpired(this, this.widgetId));
        }
      }
    };
    return {
      callback: callback,
      'error-callback': errorCallback,
      'expired-callback': expiredCallback,
      sitekey: this.sitekey,
      size: this.size,
      tabindex: this.tabindex,
      theme: this.theme,
      type: this.type
    };
  }
}

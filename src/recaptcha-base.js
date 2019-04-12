/** @global grecaptcha */
/**
 * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
 *
 * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
 * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
 * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
 * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
 */

import { className } from 'amaranth-utils';
import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, bindingMode, inject, LogManager, noView } from 'aurelia-framework';
import nanoid from 'nanoid';

import { Config } from './config';

/**
 * Hash method.
 * @returns {String}
 */
export const getHash = () => nanoid().replace(/-/gi, '');

/** @var {String} */
export const GR = 'grecaptcha';

@noView()
// @inject(Config, Element, EventAggregator)
@inject(Element, Config, EventAggregator)
export class RecaptchaBase {
  /** @var {Boolean} Optional. Trigger an auto-validate loop interval, keeping the recaptcha validated. */
  @bindable auto = false;

  /** @var {Boolean} Two way bindable value, announcing recaptcha component ID. */
  @bindable({ defaultBindingMode: bindingMode.twoWay }) id = null;

  /** @var {String} Your sitekey. */
  @bindable sitekey = '';

  /** @var {Boolean} Two way bindable value, announcing recaptcha result outside of the component. */
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = false;

  /** @var {String} */
  static HASH = getHash();

  /** @var {Config} */
  config;

  /** @var {String|null} The event name used to trigger the recaptcha validation. */
  eventName = null;

  /** @var {Date|null} The last time of grecaptcha.execute response.*/
  lastCheck = null;

  /** @var {{}} */
  __auevents__ = {};

  /** @var {{}} */
  __watchers__ = {};

  /**
   * Constructor
   * @param  {DocumentElement}    element Element to render recaptcha
   * @param  {EventAggregator}    events  Events Aggregator
   */
  constructor(element, config, events) {
    this.element = element;
    this.config = config;
    this.events = events;

    this.logger = LogManager.getLogger(className(this));
  }

  /**
   * Component Bind Handler
   */
  bind() {
    if (!this.id) {
      this.id = getHash();
    }
    if (!this.sitekey) {
      this.sitekey = this.config.get('siteKey');
    }
  }

  /**
   * Component Detached Handler
   */
  detached() {
    // this.unloadScript(this.getScriptId());
    this.unregisterEvents();
    this.unregisterWatchers();
  }

  /**
   * Compose script id.
   * @returns {String}
   */
  getScriptId() {
    return `recaptcha_${RecaptchaBase.HASH}_${this.sitekey}`;
  }

  /**
   * Load a <script> by script id and src.
   * @param {String} id
   * @param {String} src
   */
  loadScript(id, src) {
    if (!document.querySelector(`#${id}`)) {
      let script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.async = true;
      script.defer = true;
      this.logger.debug('Loading Script...', script);
      document.head.appendChild(script);
    }
    this.element.setAttribute('data-script', this.getScriptId());
  }

  /**
   * Call recaptcha.execute
   */
  recaptchaExecute() {
    throw new Error('Method is to be implemented in each extended class.');
  }

  /**
   * Component Bind Execute Event
   */
  registerExecuteEvent() {
    const eventName = `grecaptcha:execute:${this.id}`;
    this.__auevents__[eventName] = this.events.subscribe(eventName, () => {
      this.logger.debug(`Triggered ${eventName}`);
      this.recaptchaExecute();
    });
  }

  /**
   * Register an auto trigger for grecaptcha.execute using setInterval
   * @param {String} eventName
   */
  registerExecuteWatcher() {
    const eventName = `grecaptcha:execute:${this.id}`;
    this.__watchers__[eventName] = setInterval(() => {
      if (this.auto && !this.value) {
        this.events.publish(eventName);
      }
    }, 2000);
  }

  /**
   * Clear the interval for grecaptcha.execute
   */
  removeAutoTriggerExecuteEvent() {
    clearInterval(this.__grecaptcha_auto_exec_interval__);
  }

  // /**
  //  * Unload a <script> by a given id
  //  * @param {String} id
  //  * @deprecated
  //  */
  // unloadScript(id) {
  //   if (!document.querySelectorAll(`[data-script=${id}]`).length && document.querySelector(`#${id}`)) {
  //     document.querySelector(`#${id}`).remove();
  //   }
  //   if (!document.querySelectorAll('[data-script]').length && typeof window[GR] !== 'undefined') {
  //     delete window[GR];
  //   }
  // }

  /**
   * Unregister an event.
   * @param {String} eventName
   */
  unregisterEvents() {
    for (const key of Object.keys(this.__auevents__)) {
      if (typeof this.__auevents__[key].dispose === 'function') {
        this.__auevents__[key].dispose();
        delete this.__auevents__[key];
      }
    }
  }

  /**
   * Unregister an event.
   * @param {String} eventName
   */
  unregisterWatchers() {
    for (const key of Object.keys(this.__watchers__)) {
      clearInterval(this.__watchers__[key]);
      delete this.__watchers__[key];
    }
  }
}

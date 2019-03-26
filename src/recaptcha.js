/**
 * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
 *
 * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
 * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
 * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
 * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
 */

import { bindable, customElement } from 'aurelia-framework';
import parseDuration from 'parse-duration';

import { GR, RecaptchaBase } from './recaptcha-base';

/**
 * Google Recaptcha plugin, originally developed by Jeremy Danyow (http://stackoverflow.com/users/725866/jeremy-danyow)
 * and extended by Dragos Cirjan (http://github.com/dragoscirjan)
 *
 * @link http://stackoverflow.com/questions/35441787/use-googles-recaptcha-in-an-aurelia-application
 * @link http://plnkr.co/edit/rXqNdh?p=info
 * @link https://developers.google.com/recaptcha/docs/v3
 *
 * @method noView
 * @method inject
 */
@customElement('recaptcha')
export class Recaptcha extends RecaptchaBase {
  /**
   * @var {String}
   * Values:
   * * homepage 	  See a cohesive view of your traffic on the admin console while filtering scrapers.
   * * login 	      With low scores, require 2-factor-authentication or email verification to prevent credential stuffing attacks.
   * * social 	    Limit unanswered friend requests from abusive users and send risky comments to moderation.
   * * e-commerce 	Put your real sales ahead of bots and identify risky transactions.
   * Note: actions may only contain alphanumeric characters and slashes, and must not be user-specific.
   */
  @bindable action = 'homepage';

  /** @var {Boolean} Optional. Trigger an auto-validate loop interval, keeping the recaptcha validated. */
  @bindable expires = '1m';

  /**
   * Component Bind Event
   */
  bind() {
    super.bind && super.bind();
    if (!this.sitekey) {
      this.sitekey = this.config.get('siteKeys.v3');
    }

    this.loadScript(this.getScriptId(), `https://www.google.com/recaptcha/api.js?render=${this.sitekey}`);

    this.registerExecuteEvent();
  }

  /**
   * Component Attached Event
   */
  attached() {
    super.attached && super.attached();

    this.registerExecuteWatcher();
    this.registerExpireWatcher();
  }

  /**
   * Create a watcher to invalidate recaptcha token based on `expires` time limit.
   */
  registerExpireWatcher() {
    const eventName = `grecaptcha:expire:${this.id}`;
    this.__watchers__[eventName] = setInterval(() => {
      if (this.lastCheck && new Date().getTime() - this.lastCheck.getTime() > this.parsedExpires) {
        this.value = null;
      }
    }, 1000);
  }

  /**
   * @returns {Number} Parsed duration in miliseconds.
   */
  get parsedExpires() {
    return parseDuration(this.expires);
  }

  /**
   * Call recaptcha.execute
   */
  recaptchaExecute() {
    if (typeof window[GR] === undefined || !grecaptcha.execute) {
      return;
    }
    grecaptcha.execute(this.sitekey, { action: this.action }).then(token => {
      this.value = token;
      this.lastCheck = new Date();
    });
  }
}

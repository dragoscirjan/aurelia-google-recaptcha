/**
 * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
 *
 * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
 * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
 * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
 * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
 */

import { bindable, customElement } from 'aurelia-framework';

import { RecaptchaV2 } from './recaptcha-v2';

/**
 * Google Recaptcha plugin, originally developed by Jeremy Danyow (http://stackoverflow.com/users/725866/jeremy-danyow)
 * and extended by Dragos Cirjan (http://github.com/dragoscirjan)
 *
 * @link https://developers.google.com/recaptcha/docs/invisible
 *
 * @method noView
 * @method inject
 */
@customElement('recaptcha-v2-invisible')
export class RecaptchaV2Invisible extends RecaptchaV2 {
  /** @var {String} Optional. Reposition the reCAPTCHA badge. 'inline' lets you position it with CSS. Values: bottomright, bottomleft, inline. Default: inline. */
  @bindable badge = 'inline';

  /** @var {Boolean} Optional. For plugin owners to not interfere with existing reCAPTCHA installations on a page. If true, this reCAPTCHA instance will be part of a separate ID space. */
  @bindable isolated = false;

  /**
   * Component Bind Event
   */
  bind() {
    super.bind && super.bind();
    if (!this.sitekey || this.sitekey === this.config.get('siteKeys.v2')) {
      this.sitekey = this.config.get('siteKeys.v2i');
    }

    this.registerExecuteEvent();
  }

  /**
   * Component Attached Event
   */
  attached() {
    super.attached && super.attached();

    this.registerExecuteWatcher();
  }

  /**
   * Call recaptcha.execute
   */
  recaptchaExecute() {
    grecaptcha.execute(this.widgetId);
  }

  renderOptions() {
    return {
      ...super.renderOptions(),
      badge: this.badge,
      isolated: this.isolated,
      size: 'invisible'
    };
  }
}

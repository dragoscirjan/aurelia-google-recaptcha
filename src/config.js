/**
 * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
 *
 * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
 * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
 * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
 * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
 */

import { extend } from 'amaranth-utils';
import { PLATFORM } from 'aurelia-pal';

export class Config {
  /** @var {} */
  values;

  /**
   * Constructor
   */
  constructor() {
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

  /**
   * @param {FrameworkConfiguration} aurelia
   */
  configure(aurelia) {
    aurelia.globalResources(PLATFORM.moduleName('./recaptcha'));
    aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2'));
    aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2-invisible'));
  }

  /**
   * Get All
   * @returns {}
   */
  all() {
    return this.values;
  }

  /**
   * Assign
   * @param {{}} obj
   */
  assign(obj) {
    this.values = extend(this.values, obj);
  }

  /**
   * Getter
   * @param {String} key
   * @return {*}
   */
  get(key) {
    let result = extend({}, this.values);
    for (const chunk of key.split('.')) {
      result = result ? result[chunk] || undefined : undefined;
    }
    return result;
  }

  /**
   * Setter
   * @param {String} key
   * @param {*} value
   * @returns {*}
   */
  set(key, value) {
    chunks = key.split('.');
    if (chunks.length === 1) {
      this.values[key] = value;
      return this.values[key];
    }
    let part;
    while (chunks.length > 1) {
      part = part ? part[chunks.shift()] : this.values[chunks.shift()];
    }
    const lastKey = chunks.shift();
    part[lastKey] = value;
    return this.values[lastKey];
  }
}

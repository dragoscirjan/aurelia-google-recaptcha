import { PLATFORM } from 'aurelia-pal';

import { getHash } from './recaptcha-base';
import { Recaptcha } from './recaptcha';
import { RecaptchaV2 } from './recaptcha-v2';
import { RecaptchaV2Invisible } from './recaptcha-v2-invisible';

export class Config {
  /**
   * @param {FrameworkConfiguration} aurelia
   */
  configure(aurelia) {
    aurelia.globalResources(PLATFORM.moduleName('./recaptcha'));
    aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2'));
    aurelia.globalResources(PLATFORM.moduleName('./recaptcha-v2-invisible'));
  }
}

/**
 * @param {FrameworkConfiguration} aurelia
 * @param {Function}               [callback=null]
 */
export function configure(aurelia, callback = null) {
  let config = aurelia.container.get(Config);

  if (typeof callback === 'function') {
    callback(config);
  }

  config.configure(aurelia);
}

export { getHash, Recaptcha, RecaptchaV2, RecaptchaV2Invisible };

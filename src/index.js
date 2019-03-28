import { Config } from './config';
import { getHash } from './recaptcha-base';
import { Recaptcha } from './recaptcha';
import { RecaptchaV2 } from './recaptcha-v2';
import { RecaptchaV2Invisible } from './recaptcha-v2-invisible';

/**
 * @param {FrameworkConfiguration} aurelia
 * @param {Function}               callback
 */
export function configure(aurelia, callback) {
  let config = aurelia.container.get(Config);

  if (callback !== undefined && typeof callback === 'function') {
    callback(config);
  }

  config.configure(aurelia);
}

export { getHash, Recaptcha, RecaptchaV2, RecaptchaV2Invisible };

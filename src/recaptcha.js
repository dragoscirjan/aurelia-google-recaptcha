/**
 * Aurelia Plugin :: Google Recaptcha (http://itmediaconnect.ro/aurelia/aurelia-google-recaptcha)
 *
 * @link      http://github.com/itmcdev/aurelia-google-re captcha for the canonical source repository
 * @link      https://github.com/ITMCdev/aurelia-google-recaptcha/issues for issues
 * @copyright Copyright (c) 2007-2016 IT Media Connect S.R.L. Romania (http://www.itmediaconnect.ro)
 * @license   https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/LICENSE MIT License
 */

import {inject, noView, bindable} from 'aurelia-framework';

const recaptchaCallbackName = 'setRecaptchaReady';
const ready = new Promise(resolve => window[recaptchaCallbackName] = resolve);

// https://developers.google.com/recaptcha/docs/display#explicit_render
let script = document.createElement('script');
script.src = `https://www.google.com/recaptcha/api.js?onload=${recaptchaCallbackName}&render=explicit`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

@noView()
@inject(Element)
export class Recaptcha {
    @bindable verified;
    @bindable theme = 'light';

    constructor(element) {
        this.element = element;
    }

    attached() {
        ready.then(() => grecaptcha.render(this.element, {
            sitekey: this.sitekey,
            theme: this.theme,
            callback: this.verified
        }));
    }
}

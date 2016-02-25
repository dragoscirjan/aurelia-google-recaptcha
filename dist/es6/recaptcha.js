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

/**
 * Google Recaptcha Script
 * @var {DocumentElement}
 * @link https://developers.google.com/recaptcha/docs/display
 */
let script = document.createElement('script');
script.src = `https://www.google.com/recaptcha/api.js?onload=${recaptchaCallbackName}&render=explicit&hl=${document.getElementsByTagName('html')[0].getAttribute('lang') || 'en'}`;
script.async = true;
script.defer = true;
document.head.appendChild(script);

/**
 * Google Recaptcha plugin, originally developed by Jeremy Danyow (http://stackoverflow.com/users/725866/jeremy-danyow)
 * and extended by Dragos Cirjan (http://github.com/dragoscirjan)
 *
 * @link http://stackoverflow.com/questions/35441787/use-googles-recaptcha-in-an-aurelia-application
 * @link http://plnkr.co/edit/rXqNdh?p=info
 *
 * @method noView
 * @method inject
 */
@noView()
@inject(Element)
export class Recaptcha {
    @bindable callback;
    @bindable expiredCallback;
    @bindable size = 'normal';
    @bindable tabindex = 0;
    @bindable theme = 'light';
    @bindable type = 'image';
    @bindable sitekey = '';

    /**
     * [constructor description]
     * @method constructor
     * @param  {DocumentElement}    element Element to render recaptcha
     * @return {this}
     */
    constructor(element) {
        this.element = element;
    }

    /**
     * Attached event (see Aurelia Component Documentation)
     * @method attached
     */
    attached() {
        ready.then(() => {
            grecaptcha.render(this.element, {
                callback: this.callback,
                'expired-callback': this.expiredCallback,
                sitekey: this.sitekey,
                size: this.size,
                tabindex: this.tabindex,
                theme: this.theme,
                type: this.type
            });
        });
    }
}

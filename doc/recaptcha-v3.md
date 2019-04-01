# reCAPTCHA v3

[reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) is an invisible component, which will evaluate automatically or by custom trigger and return a score for each request without user friction (use does not need to interract with the plugin).

Please also check

* reCAPTCHA v3
* reCAPTCHA v2
  * [Checkbox](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md)
  * [Invisible](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2-invisible.md)

## Index

<!-- TOC -->

- [reCAPTCHA v3](#recaptcha-v3)
    - [Index](#index)
    - [Additional Options](#additional-options)
    - [Events](#events)
    - [Usage](#usage)

<!-- /TOC -->

## Additional Options

> NOTE: All [generic options](https://github.com/dragoscirjan/aurelia-google-recaptcha#generic-options) are still valid.

> NOTE: As far as we read, all [reCAPTCHA invisible options](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md) are still valid, yet some may not work.

| Option | Type | Default | Description |
|---|---|---|---|
| `action` | String | `homepage` | _Optional._ (Action name)(https://developers.google.com/recaptcha/docs/v3). Use to identify the action or page recaptcha validates. Can be: `homepage`, `login`, `social`, `e-commerce` and many others. May only contain alphanumeric characters and slashes, and must not be user-specific.  |
| `expires` | String  | `1m` | _Optional._ Trigger an auto-validate loop interval, keeping the recaptcha validated. Expiration values are parsed with (parse-duration)[https://github.com/jkroso/parse-duration] |

## Events

| Event | Description |
|---|---|
| `grecaptcha:execute:{RECAPTCHA_ID}` | Trigger execution of the recaptcha. |

##Usage

In `src/component.html` use

```html
<!-- If interested in value only. -->
<recaptcha
    action="website/products"
    expires="20m"
    id.bind="tokenId"
    sitekey="YOUR_SITE_KEY"
    value.bind="recaptchaToken"
></recaptcha>
<button click.trigger="customExecute()">Trigger</button>

<!-- or... trigger automatically -->
<recaptcha
    action="website/products"
    auto="1"
    expires="20m"
    sitekey="YOUR_SITE_KEY"
    value.bind="recaptchaToken"
></recaptcha>
```

In `src/component.js` use

```javascript
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {ValidationController, ValidationRules} from 'aurelia-validation';

@inject(EventAggregator)
export class Component {
    /**
     * If set, it will use the token ID you give to the variable, otherwise it will 
     * initialize it from within the component.
     */
    // tokenId = 'MY_TOKEN_ID';

    recaptchaToken = null;

    /**
     * Constructor
     */
    constructor(events, validation) {
        this.events = events;
        this.validation = validation;

        // Using ValidationController is not mandatory.
        ValidationRules
            .ensure('response').required().withMessage('Please verify the recaptcha.')
            .on(this);
        // this.validationController.addRenderer(...);
    }

    /**
     * Form reset callable.
     */
    reset() {
        this.events.publish(`grecaptcha:reset:${this.tokenId}`);
    }

    /**
     * Form submit callable.
     */
    async submit() {
        // if `auto` option is not enabled, calling execute event is required
        // await this.recaptchaExecute();

        try {
            const result = this.validation.validate();
            if (!result.valid) return;
            // submit your form data
        } catch (e) {
            // hanlde possible errors
        }
    }

    /**
     * Manually trigger reCAPTCHA execute event.
     */
    recaptchaExecute() {
        this.events.publish(`grecaptcha:execute:${this.tokenId}`);

        return new Promise((resolve, reject) {
            // constantly check for token
            const interval = setInterval(() => {
                if (this.recaptchaToken) {
                    resolve();
                    clearInterval(interval);
                }
            }, 500);
            // to the above check for a certain amount of time, then fail
            setTimeout(() => {
                if (interval) {
                    clearInterval(interval);
                    reject();
                }
            }, 20000);
        });
    }
}
```
# reCAPTCHA v2

##  Invisible Implementation

[reCAPTCHA v2 Invisible](https://developers.google.com/recaptcha/docs/invisible) is an invisible component, which will evaluate automatically or by custom trigger and return a score for each request without user friction (use does not need to interract with the plugin).

Please also check

* [reCAPTCHA v3](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v3.md)
* reCAPTCHA v2
  * [Checkbox](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md)
  * Invisible

## Index

<!-- TOC -->

- [reCAPTCHA v2](#recaptcha-v2)
    - [Invisible Implementation](#invisible-implementation)
    - [Index](#index)
    - [Additional Options](#additional-options)
    - [Events](#events)
    - [Usage](#usage)
        - [Using Callbacks (callable)](#using-callbacks-callable)
        - [Using Callbacks (string)](#using-callbacks-string)

<!-- /TOC -->

## Additional Options

> NOTE: All [generic options](https://github.com/dragoscirjan/aurelia-google-recaptcha#generic-options) as well as [reCAPTCHA checkbox options](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md) are still valid, yet some may not work.

| Option | Type | Default | Description |
|---|---|---|---|
| `badge` | String | `inline` | _Optional._ Reposition the reCAPTCHA badge. 'inline' lets you position it with CSS. Values: `bottomright`, `bottomleft`, `inline`.  |
| `isolated` | Boolean  | `false` | _Optional._ For plugin owners to not interfere with existing reCAPTCHA installations on a page. If true, this reCAPTCHA instance will be part of a separate ID space. |

## Events

> NOTE: `grecaptcha:reset:{RECAPTCHA_ID}` event is valid for this component as well.

| Event | Description |
|---|---|
| `grecaptcha:execute:{RECAPTCHA_ID}` | Trigger execution of the recaptcha. |


## Usage

In `src/component.html` use

```html
<recaptcha-v2-invisible
    id.bind="tokenId"
    sitekey="YOUR_SITE_KEY"
    size="invisible"
    value.bind="recaptchaToken"
></recaptcha-v2-invisible>
<button click.trigger="customReset()">Reset</button>
<button click.trigger="customExecute()">Trigger</button>
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

### Using Callbacks (callable)

Please read [reCAPTCHA v2 Checkbox](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md#using-callbacks-callable) documentation. Nothing changes here.

### Using Callbacks (string)

Please read [reCAPTCHA v2 Checkbox](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md#using-callbacks-string) documentation. Nothing changes here.


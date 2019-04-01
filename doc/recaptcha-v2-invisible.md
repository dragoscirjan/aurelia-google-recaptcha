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
        - [HTML](#html)
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

### HTML

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

#### Using Callbacks (callable)

```html
<recaptcha-v2-invisible
    callback.call="callableCustomCallback($event)"
    sitekey="YOUR_SITE_KEY"
    size="invisible"
    value.bind="recaptchaToken"
></recaptcha-v2-invisible>
```

#### Using Callbacks (string)

```html
<recaptcha-v2-invisible
    callback="customCallback"
    sitekey="YOUR_SITE_KEY"
    size="invisible"
    value.bind="recaptchaToken"
></recaptcha-v2-invisible>
````

In `src/component.js` use

```javascript
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Component {
    /**
     * If set, it will use the token ID you give to the variable, otherwise it will 
     * initialize it from within the component.
     */
    // tokenId = 'MY_TOKEN_ID';

    /**
     * Constructor
     */
    constructor(events) {
        this.events = events;
    }

    /**
     * Aurelia Bind Handler
     */
    bind(...args) {
        /**
         * Add this, only if you desire to use a custom callback.
         */
        // window.customCallback = ($event) => {
        //     console.log(this.recaptchaToken);
        // };
    }

    /**
     * Use this method to reset the recaptcha tag after you submited the token.
     */
    customReset() {
        this.events.publish(`grecaptcha:reset:${this.tokenId}`);
    }

    /**
     * Use this method to trigger the recaptcha execution.
     */
    customExecute() {
        this.events.publish(`grecaptcha:execute:${this.tokenId}`);
    }

    /**
     * Add this only if you desire a callable custom callback.
     * Even though we suppot the string version as well, we recommend using this one for better integration with Aurelia.
     */
    // callableCustomCallback($event) {
    //     console.log($event.token, this.recaptchaToken);
    // }
}
```
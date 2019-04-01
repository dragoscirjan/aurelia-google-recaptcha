# reCAPTCHA v2

##  Checkbox Implementation

[reCAPTCHA v2 Checkbox](https://developers.google.com/recaptcha/docs/display) is an interactable with component, which will evaluate return a score for each request without user friction (use does not need to interract with the plugin).

<!-- TOC -->

- [reCAPTCHA v2](#recaptcha-v2)
    - [Checkbox Implementation](#checkbox-implementation)
    - [Additional Options](#additional-options)
    - [Events](#events)

<!-- /TOC -->

Please also check

* [reCAPTCHA v3](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v3.md)
* reCAPTCHA v2
  * Checkbox
  * [Invisible](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-invisible.md)

## Additional Options

| Option | Type | Default | Description |
|---|---|---|---|
| `callback` | String|Function|null | undefined | _Optional._ Provide a function you wish to run for custom callback. Use both as String, defining the function as `window` parameter, or as a callable method (using `callback.call`). |
| `error-callback` | String|Function|null  | undefined | _Optional._ Provide a function you wish to run for custom error callback. Use both as String, defining the function as `window` parameter, or as a callable method (using `error-callback.call`). |
| `expired-callback` | String|Function|null | undefined | _Optional._ Provide a function you wish to run for custom expired callback. Use both as String, defining the function as `window` parameter, or as a callable method (using `expired-callback.call`). |
| `size` | String | `normal` | _Optional._ The size of the widget. Values: `compact`, `normal`. |
| `tabindex` | Number | `0` | _Optional._ The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier. |
| `theme` | String | `light` | _Optional._ The color theme of the widget. Values: `dark`, `light`. |

## Events

| Event | Description |
|---|---|
| `grecaptcha:reset:{RECAPTCHA_ID}` | Reset event. Call this after submitting data, if you still need to re-use the form. |

In `src/component.html` use

```html
<!-- If interested in value only. -->
<recaptcha-v2
    id.bind="tokenId"
    sitekey="YOUR_SITE_KEY"
    value.bind="recaptchaToken"
></recaptcha-v2>
<button click.trigger="customReset()">Reset</button>

<!-- If interested in a callable custom callback -->
<recaptcha-v2
    sitekey="YOUR_SITE_KEY"
    value.bind="bindedRecaptchaToken"
    callback.call="callableCustomCallback($event)"
></recaptcha-v2>

<!-- If interested in a custom callback -->
<recaptcha-v2
    sitekey="YOUR_SITE_KEY"
    value.bind="recaptchaToken"
    callback="customCallback"
></recaptcha-v2>
```

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
        // window.customCallback = () => {
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
     * Add this only if you desire a binded custom callback.
     * Even though we suppot the string version as well, we recommend using this one for better integration with Aurelia.
     */
    // callableCustomCallback($event) {
    //     console.log($event.token, this.bindedRecaptchaToken);
    // }
}
```




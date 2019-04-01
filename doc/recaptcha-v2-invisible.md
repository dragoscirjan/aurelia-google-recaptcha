### V2 (Invisible)

#### Additional Options

> NOTE: All options from `<recaptcha-v2>` are still valid, however some may not work. Please check [Google Recaptcha Invisible documentation](https://developers.google.com/recaptcha/docs/invisible).

| Option | Type | Default | Description |
|---|---|---|---|
| `badge` | String | `inline` | _Optional._ Reposition the reCAPTCHA badge. 'inline' lets you position it with CSS. Values: `bottomright`, `bottomleft`, `inline`.  |
| `isolated` | Boolean  | `false` | _Optional._ For plugin owners to not interfere with existing reCAPTCHA installations on a page. If true, this reCAPTCHA instance will be part of a separate ID space. |

#### Events

> NOTE: `grecaptcha:reset:{RECAPTCHA_ID}` event is valid for this component as well.

| Event | Description |
|---|---|
| `grecaptcha:execute:{RECAPTCHA_ID}` | Trigger execution of the recaptcha. |


In `src/component.html` use

```html
<!-- If interested in value only. -->
<recaptcha-v2-invisible
    id.bind="tokenId"
    sitekey="YOUR_SITE_KEY"
    size="invisible"
    value.bind="recaptchaToken"
></recaptcha-v2-invisible>
<button click.trigger="customReset()">Reset</button>
<button click.trigger="customExecute()">Trigger</button>

<!-- If interested in a custom callback -->
<recaptcha-v2-invisible
    callback="customCallback"
    sitekey="YOUR_SITE_KEY"
    size="invisible"
    value.bind="recaptchaToken"
></recaptcha-v2-invisible>
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
     * Use this method to trigger the recaptcha execution.
     */
    customExecute() {
        this.events.publish(`grecaptcha:execute:${this.tokenId}`);
    }
}
```
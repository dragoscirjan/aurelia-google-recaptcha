## Component

### V2 (Checkbox)

#### Additional Options

| Option | Type | Default | Description |
|---|---|---|---|
| `callback` | String|null | undefined | _Optional._ Provide a name for the function you wish to add for custom callback.  |
| `error-callback` | String  | undefined | _Optional._ Provide a name for the function you wish to add for custom error callback. |
| `expired-callback` | String | undefined | _Optional._ Provide a name for the function you wish to add for custom expired callback. |
| `size` | String | `normal` | _Optional._ The size of the widget. Values: `compact`, `normal`. |
| `tabindex` | Number | `0` | _Optional._ The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier. |
| `theme` | String | `light` | _Optional._ The color theme of the widget. Values: `dark`, `light`. |

#### Events

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
}
```




### V3

#### Additional Options

> NOTE: All options from `<recaptcha-v2>` are still valid, however some may not work. Please check [Google Recaptcha Invisible documentation](https://developers.google.com/recaptcha/docs/invisible).

| Option | Type | Default | Description |
|---|---|---|---|
| `action` | String | `homepage` | _Optional._ (Action name)(https://developers.google.com/recaptcha/docs/v3). Use to identify the action or page recaptcha validates. Can be: `homepage`, `login`, `social`, `e-commerce` and many others. May only contain alphanumeric characters and slashes, and must not be user-specific.  |
| `expires` | String  | `1m` | _Optional._ Trigger an auto-validate loop interval, keeping the recaptcha validated. Expiration values are parsed with (parse-duration)[https://github.com/jkroso/parse-duration] |

#### Events

| Event | Description |
|---|---|
| `grecaptcha:execute:{RECAPTCHA_ID}` | Trigger execution of the recaptcha. |


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
     * Use this method to trigger the recaptcha execution.
     */
    customExecute() {
        this.events.publish(`grecaptcha:execute:${this.tokenId}`);
    }
}
```
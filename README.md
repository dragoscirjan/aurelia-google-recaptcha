# Google Recaptcha plugin for Aurelia Framework

[![Npm Version](https://img.shields.io/npm/v/aurelia-google-recaptcha.svg)](https://www.npmjs.com/package/aurelia-google-recaptcha)
[![HitCount](http://hits.dwyl.io/dragoscirjan/aurelia-google-recaptcha.svg)](http://hits.dwyl.io/dragoscirjan/aurelia-google-recaptcha)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dragoscirjan/aurelia-google-recaptcha/issues)

[![TravisCI](https://travis-ci.org/dragoscirjan/aurelia-google-recaptcha.svg?branch=master)](https://travis-ci.org/dragoscirjan/aurelia-google-recaptcha)
[![CircleCI](https://circleci.com/gh/dragoscirjan/aurelia-google-recaptcha.svg?style=shield)](https://circleci.com/gh/dragoscirjan/aurelia-google-recaptcha)

[![Donate to this project using Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://patreon.com/dragoscirjan)
<!-- [![Donate to this project using Flattr](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/balupton)
[![Donate to this project using Liberapay](https://img.shields.io/badge/liberapay-donate-yellow.svg)](https://liberapay.com/dragoscirjan)
[![Donate to this project using Thanks App](https://img.shields.io/badge/thanksapp-donate-yellow.svg)](https://givethanks.app/donate/npm/badges)
[![Donate to this project using Boost Lab](https://img.shields.io/badge/boostlab-donate-yellow.svg)](https://boost-lab.app/dragoscirjan/badges)
[![Donate to this project using Buy Me A Coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)](https://buymeacoffee.com/balupton)
[![Donate to this project using Open Collective](https://img.shields.io/badge/open%20collective-donate-yellow.svg)](https://opencollective.com/dragoscirjan)
[![Donate to this project using Cryptocurrency](https://img.shields.io/badge/crypto-donate-yellow.svg)](https://dragoscirjan.me/crypto)
[![Donate to this project using Paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://dragoscirjan.me/paypal)
[![Buy an item on our wishlist for us](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://dragoscirjan.me/wishlist) -->


Plugin is inspired by [Jeremy Danyow](http://stackoverflow.com/users/725866/jeremy-danyow)'s [post](http://stackoverflow.com/questions/35441787/use-googles-recaptcha-in-an-aurelia-application), so please give a lot of credits to him as well, as we do.

## Index

<!-- TOC -->

- [Google Recaptcha plugin for Aurelia Framework](#google-recaptcha-plugin-for-aurelia-framework)
    - [Index](#index)
    - [Getting Started](#getting-started)
    - [Usage](#usage)
    - [Options](#options)
    - [Component](#component)
        - [V2 (Checkbox)](#v2-checkbox)
            - [Additional Options](#additional-options)
            - [Events](#events)
        - [V2 (Invisible)](#v2-invisible)
            - [Additional Options](#additional-options-1)
            - [Events](#events-1)
        - [V3](#v3)
            - [Additional Options](#additional-options-2)
            - [Events](#events-2)
    - [Development](#development)
    - [Issues](#issues)
    - [License](#license)

<!-- /TOC -->

## Getting Started

```sh
npm i aurelia-google-recaptcha --save
```

or

```sh
yarn add aurelia-google-recaptcha
```

## Usage

In your aurelia `main.js` add:

```jsx
aurelia.use.plugin(PLATFORM.moduleName('aurelia-google-recaptcha'));
// or (if you want to configure the plugin from the start)
aurelia.use.plugin(PLATFORM.moduleName('aurelia-google-recaptcha'), config => {
    config.assign({
        siteKey: '', // use this as general sitekey if you use only one type of recaptcha
        siteKeys: {
          v2: '', // use these sitekeys to separte the values between all 3 types of recaptcha
          v2i: '',
          v3: ''
        },
        lang: 'en'  // for V2, we can also set the supported language
                    // see https://developers.google.com/recaptcha/docs/language
    });
});
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `auto` | Boolean | `false` | _Optional._ Trigger an auto-validate loop interval, keeping the recaptcha validated. |
| `id` | String |   | _Optional._ _Two Way_ bindable value, announcing recaptcha component ID. |
| `sitekey` | String  |   | _Optional._ Your can also mention the sitekey inline within code. This value will override the one from config. |
| `value` | String |   | _Optional._ _Two Way_ bindable value, announcing recaptcha result outside of the component. |

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

## Development

Fork the repo then clone it

`$ git clone git@github.com:dragoscirjan/aurelia-google-recaptcha-dev.git && cd aurelia-google-recaptcha`

`yarn global add gulp-cli` (or `$ npm install --global gulp-cli`): Install Gulp cli tool.

`$ yarn` (or `$ npm i`): Install the dependencies;

`$ yarn build` (or `$ npm run build`): Build to production;

`$ yarn dev`: Run the docz to see your changes;

> NOTE: Momentarely I do not use the testing environment. I'm using [this project](https://github.com/dragoscirjan/aurelia-plugins-dev) to develop. You're all invited to help with the unit tests, if you wish to.

`$ yarn test`: Run all tests: type checking and unit tests;

`$ yarn test:watch`: Watch unit tests;

`$ yarn tsc`: Typescript checking;

`$ yarn tsc:watch`: Typescript checking with watching;

## Issues

For issues, please reffer to this repository's [issue page](https://github.com/dragoscirjan/aurelia-google-recaptcha/issues).

## License

[MIT](https://github.com/dragoscirjan/aurelia-content-loader/blob/master/LICENSE)

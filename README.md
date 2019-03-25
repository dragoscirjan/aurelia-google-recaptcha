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

- [Aurelia Google Recaptcha](#aurelia-google-recaptcha)

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
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `auto` | Boolean | `false` | _Optional._ Trigger an auto-validate loop interval, keeping the recaptcha validated. |
| `id` | String |   | _Optional._ _Two Way_ bindable value, announcing recaptcha component ID. |
| `sitekey` | String  |  ` ` | Your sitekey. |
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
|---|---|---|---|
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

<!-- If interested in a custom callback --
<recaptcha-v2
    sitekey="YOUR_SITE_KEY"
    value.bind="recaptchaToken"
    callback="customCallback"
></recaptcha-v2> 
<!-- -->
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
|---|---|---|---|
| `grecaptcha:execute:{RECAPTCHA_ID}` | @TODO: |


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

<!-- If interested in a custom callback --
<recaptcha-v2-invisible
    callback="customCallback"
    sitekey="YOUR_SITE_KEY"
    size="invisible"
    value.bind="recaptchaToken"
></recaptcha-v2-invisible> 
<!-- -->
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



## Recaptcha variables

As you can see while inspecting the code (see [`attached`](https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/src/recaptcha.js) method), we tried implementing all the variables Google Recaptcha uses. All those variables can be used within the `<recaptcha>` tag.

## Issues

For issues, please reffer to this repository's issue page.

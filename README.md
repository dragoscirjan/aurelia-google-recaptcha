# aurelia-google-recaptcha

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


An integration of [Google](https://google.com)'s [reCAPTCHA](https://developers.google.com/recaptcha/intro) api for [Aurelia](https://aurelia.io) Framework.

Plugin is inspired by [Jeremy Danyow](http://stackoverflow.com/users/725866/jeremy-danyow)'s [post](http://stackoverflow.com/questions/35441787/use-googles-recaptcha-in-an-aurelia-application), so please give a lot of credits to him as well, as we do.

## Index

<!-- TOC -->

- [aurelia-google-recaptcha](#aurelia-google-recaptcha)
    - [Index](#index)
    - [Audience](#audience)
    - [Getting Started](#getting-started)
    - [Usage](#usage)
        - [Generic Options](#generic-options)
    - [Overview](#overview)
    - [Development](#development)
    - [Issues](#issues)
    - [License](#license)

<!-- /TOC -->


## Audience

This documentation is designed for people familiar with [Aurelia](https://aurelia.io) Framework, HTML forms, server-side processing or mobile application development.

We hope you find this documentation easy to follow. For feedback and discussions please use the [issues](https://github.com/dragoscirjan/aurelia-google-recaptcha/issues) page of this project.

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

In your HTML add one of the components as presented in the [Overview](#overview) section.

```html
<recaptcha-* ...></recaptcha-*>
```

### Generic Options

| Option | Type | Default | Description |
|---|---|---|---|
| `auto` | Boolean | `false` | _Optional._ Trigger an auto-validate loop interval, keeping the recaptcha validated. |
| `id` | String |   | _Optional._ _Two Way_ bindable value, announcing recaptcha component ID. |
| `sitekey` | String  |   | _Optional._ Your can also mention the sitekey inline within code. This value will override the one from config. |
| `value` | String |   | _Optional._ _Two Way_ bindable value, announcing recaptcha result outside of the component. |

## Overview

As [Google](https://google.com) will tell, you, to start using [reCAPTCHA](https://developers.google.com/recaptcha/intro), you need to sign up for an API key pair for your site. Please read the documentation on [reCAPTCHA](https://developers.google.com/recaptcha/intro) website to learn how to obtain the API keys.

From the versions presented by [reCAPTCHA](https://developers.google.com/recaptcha/intro), we chose to implement, within our [Aurelia](https://aurelia.io) plugin, the following:

* [reCAPTCHA v3](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v3.md)
* reCAPTCHA v2
  * [Checkbox](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-v2.md)
  * [Invisible](https://github.com/dragoscirjan/aurelia-google-recaptcha/blob/master/doc/recaptcha-invisible.md)

For [verifying the user's response](https://developers.google.com/recaptcha/docs/verify) please read the reCAPTCHA documentation.

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

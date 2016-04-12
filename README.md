# Google Recaptcha plugin for Aurelia Framework

Plugin is inspired by [Jeremy Danyow](http://stackoverflow.com/users/725866/jeremy-danyow)'s [post](http://stackoverflow.com/questions/35441787/use-googles-recaptcha-in-an-aurelia-application), so please give a lot of credits to him as well, as we do.

## Usage

### Install
```shell
jspm install google-recaptcha=github:itmcdev/aurelia-google-recaptcha@master
```

### Bootstrap

In `src/main.js` just import the plugin.

```javascript
import 'bootstrap';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('google-recaptcha')
        ;
    // ...
    aurelia.start().then(a => a.setRoot());
}
```

### Component

In `src/component.html` use

```html
<recaptcha sitekey="YOUR_KEY" theme="light" callback="toggleRecaptchaValidate"></recaptcha>
```

In `src/component.js` use

```javascript
export class Component {

    /**
     * constructor
     */
    constructor() {
        let self = this;
        // recaptcha validate function
        window.toggleRecaptchaValidate = (result) => {
            self.toggleRecaptchaValidate(result);
        };
    }

    /**
     * @method onRecaptchaVerified
     * @return {[type]}            [description]
     */
    toggleRecaptchaValidate(result) {
        // your recaptcha result here
    }
}
```

#### Recaptcha variables

As you can see while inspecting the code (see [`attached`](https://github.com/ITMCdev/aurelia-google-recaptcha/blob/master/src/recaptcha.js) method), we tried implementing all the variables Google Recaptcha uses. All those variables can be used within the `<recaptcha>` tag.

### Recaptcha result

To play directly with google recaptcha's instance, please use `grecatpcha` variale.
```javascript
let recaptchaResult = grecaptcha.getResponse()
```

## Issues

For issues, please reffer to this repository's issue page.

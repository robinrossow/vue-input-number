# Vue Input Number
Input field component to display a formatted number value. It is meant to be used with [Vue 3](https://v3.vuejs.org/).

This is rewrite based on [vue-numeric](https://github.com/kevinongko/vue-numeric)

## Installation

### Install via NPM
```sh
$ npm install @robin-rossow/vue-input-number --save
```

#### Use globally

```ts
import VueInputNumberPlugin from '@robin-rossow/vue-input-number'

import {createApp} from 'vue'
import App from './App.vue'

createApp(App)
    .use(VueInputNumberPlugin)
    .mount('#app')
```

#### Load in component
```ts
import {VueInputNumber} from '@robin-rossow/vue-input-number'
```

## Usage

### Load in template
```vue
<VueInputNumber v-model="ourModel"/>
```

### Props
| Props                   | Required | Type                     | Default                 |
|-------------------------|----------|--------------------------|-------------------------|
| >v-model                | ✅        | string &#124; number     | -                       |
| >outputType             | ❌        | 'Number' &#124; 'String' | 'Number'                |
| >min                    | ❌        | number                   | Number.MIN_SAFE_INTEGER |
| >max                    | ❌        | number                   | Number.MAX_SAFE_INTEGER |
| >precision              | ❌        | number                   | 0                       |
| >thousandSeparator      | ❌        | string &#124; undefined  | ','                     |
| >decimalSeparator       | ❌        | string &#124; undefined  | ','                     |
| >currency               | ❌        | string                   | ''                      |
| >currencySymbolPosition | ❌        | 'prefix' &#124;'suffix'  | 'prefix'                |
| >emptyValue             | ❌        | number &#124; ''         | ''                      |

## License
vue-number-input is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

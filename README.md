# Vue Input Number
Input field component to display a formatted number value. It is meant to be used with Vue 3.

[Demo](https://robinrossow.github.io/vue-input-number/)

## Installation

### Install via NPM
```sh
$ npm install @robin-rossow/vue-input-number --save
```

#### Load in component
```ts
import { VueInputNumber } from '@robin-rossow/vue-input-number'
```

## Usage

### Load in template
```vue
<VueInputNumber v-model="ourModel"/>
```

### Props
| Props                  | Required | Type                                       | Default  |
|------------------------|---------|--------------------------------------------|----------|
| v-model                | ✅        | Ref<string &#124; number &#124; undefined> | -        |
| outputType             | ❌       | 'Number' &#124; 'String'                   | 'Number' |
| precision              | ❌       | number                                     | 0        |
| thousandSeparator      | ❌       | string                                     | ','      |
| decimalSeparator       | ❌       | string                                     | '.'      |
| emptyValue             | ❌       |   ''         &#124;    0                   | ''       |

## License
vue-number-input is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

<script setup lang="ts">
import {ref} from 'vue'
import VueInputNumber from "./components/VueInputNumber.vue";

const testNumber = ref(13.37)
const currency = ref('€')
const min = ref(0)
const max = ref(2000)
const placeholder = ref('Placeholder')
const emptyValue = ref('')
const precision = ref(2)
const thousandSeparator = ref('.')
const decimalSeparator = ref(',')
const outputType = ref<'Number' | 'String'>('Number')
const readOnly = ref('false')
const disabled = ref('false')
const currencySymbolPosition = ref<'prefix' | 'suffix'>('suffix')
</script>

<template>
  <h1>Vue Input Number</h1>
  <p>Vue Input Number is a unstyled input component for Vue 3 written in TypeScript.</p>
  <h2>Installation</h2>
  <pre>npm add @robin-rossow/vue-input-number</pre>
  <h2>Add locally in a component</h2>
  <pre>import { VueInputNumber } from '@robin-rossow/vue-input-number'</pre>
  <h2>Usage</h2>
  <pre>&lt;VueInputNumber v-model="ourModel" /&gt;</pre>
  <h2>Props</h2>
  <div style="overflow-x: auto">
    <table>
      <thead>
      <tr>
        <td>name</td>
        <td>required</td>
        <td>type</td>
        <td>default</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>v-model</td>
        <td>✅</td>
        <td>string | number | undefined</td>
        <td></td>
      </tr>
      <tr>
        <td>outputType</td>
        <td>❌</td>
        <td>'Number' | 'String'</td>
        <td>'Number'</td>
      </tr>
      <tr>
        <td>min</td>
        <td>❌</td>
        <td>number</td>
        <td>Number.MIN_SAFE_INTEGER</td>
      </tr>
      <tr>
        <td>max</td>
        <td>❌</td>
        <td>number</td>
        <td>Number.MAX_SAFE_INTEGER</td>
      </tr>
      <tr>
        <td>precision</td>
        <td>❌</td>
        <td>number</td>
        <td>0</td>
      </tr>
      <tr>
        <td>thousandSeparator</td>
        <td>❌</td>
        <td>string | undefined</td>
        <td>','</td>
      </tr>
      <tr>
        <td>decimalSeparator</td>
        <td>❌</td>
        <td>string | undefined</td>
        <td>'.'</td>
      </tr>
      <tr>
        <td>currency</td>
        <td>❌</td>
        <td>string</td>
        <td>''</td>
      </tr>
      <tr>
        <td>currencySymbolPosition</td>
        <td>❌</td>
        <td>'prefix' | 'suffix'</td>
        <td>'prefix'</td>
      </tr>
      <tr>
        <td>emptyValue</td>
        <td>❌</td>
        <td>number | ''</td>
        <td>''</td>
      </tr>
      </tbody>
    </table>
  </div>
  <p>You can also pass along any additional input attributes such as placeholder, class, readonly, disabled etc.</p>
  <h2>Live example</h2>
  <div class="flex" style="margin-bottom: 3rem;">
    <div>
      <VueInputNumber
          id="vue-input-number"
          v-model="testNumber"
          :currency="currency"
          :min="Number(min)"
          :max="Number(max)"
          class="test"
          :placeholder="placeholder"
          :emptyValue="emptyValue === '' ? '' : Number(emptyValue)"
          :precision="Number(precision)"
          :thousandSeparator="thousandSeparator"
          :decimalSeparator="decimalSeparator"
          :outputType="outputType"
          :readOnly="JSON.parse(readOnly)"
          :disabled="JSON.parse(disabled)"
          :currencySymbolPosition="currencySymbolPosition"
      />
    </div>

    <div>
      Value: {{testNumber}} Type: {{ typeof testNumber }}
    </div>
  </div>

  <h2>Props</h2>
  <label class="label">outputType</label>
  <input type="radio" id="outputType-true" value="Number" v-model="outputType"/>
  <label for="outputType-true">Number</label>
  <input type="radio" id="outputType-false" value="String" v-model="outputType"/>
  <label for="outputType-false">String</label>

  <div class="flex">
    <div>
      <label class="label" for="min">min</label>
      <input v-model="min" id="min" type="number"/>
    </div>
    <div>
      <label class="label" for="max">max</label>
      <input v-model="max" id="max" type="number"/>
    </div>
  </div>

  <div class="flex">
    <div>
      <label class="label" for="precision">precision</label>
      <input v-model="precision" id="precision" />
    </div>
    <div>
      <label class="label" for="thousandSeparator">thousandSeparator</label>
      <input v-model="thousandSeparator" id="thousandSeparator" />
    </div>
    <div>
      <label class="label" for="decimalSeparator">decimalSeparator</label>
      <input v-model="decimalSeparator" id="decimalSeparator" />
    </div>
  </div>

  <div class="flex">
    <div>
      <label class="label" for="currency">currency</label>
      <input v-model="currency" id="currency"/>
    </div>
    <div>
      <label class="label">currencySymbolPosition</label>
      <input type="radio" id="currencySymbolPosition-prefix" value="prefix" v-model="currencySymbolPosition"/>
      <label for="currencySymbolPosition-prefix">prefix</label>
      <input type="radio" id="currencySymbolPosition-suffix" value="suffix" v-model="currencySymbolPosition"/>
      <label for="currencySymbolPosition-suffix">suffix</label>
    </div>
  </div>

  <div class="flex">
    <div>
      <label class="label" for="emptyValue">emptyValue</label>
      <input v-model="emptyValue" id="emptyValue" />
    </div>
    <div>
      <label class="label" for="placeholder">placeholder</label>
      <input v-model="placeholder" id="placeholder"/>
    </div>
  </div>

  <div class="flex">
    <div>
      <label class="label">readonly</label>
      <input type="radio" id="readOnly-true" value="true" v-model="readOnly"/>
      <label for="readOnly-true">true</label>
      <input type="radio" id="readOnly-false" value="false" v-model="readOnly"/>
      <label for="readOnly-false">false</label>
    </div>
    <div>
      <label class="label">disabled</label>
      <input type="radio" id="disabled-true" value="true" v-model="disabled"/>
      <label for="disabled-true">true</label>
      <input type="radio" id="disabled-false" value="false" v-model="disabled"/>
      <label for="disabled-false">false</label>
    </div>
  </div>
</template>


<style scoped>
:global(body) {
  font-family: system-ui;
}

h2 {
  margin-top: 3rem;
}

.label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}

table {
  border-collapse: collapse;
}

thead {
  border-bottom: 2px solid #ddd;
}

tbody tr {
  border-bottom: 1px solid #ddd;
}

td {
  padding: 0.5rem;
}

.flex {
  display: flex;
  gap: 2rem;
}

input[type=radio] + label {
  margin-right: 1rem;
}
</style>

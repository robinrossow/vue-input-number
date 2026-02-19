<script setup lang="ts">
import {ref} from 'vue'
import VueInputNumber from "./components/VueInputNumber.vue"

const testNumber = ref(1337)
const emptyValue = ref<'' | 0>('')
const precision = ref(2)
const thousandSeparator = ref('.')
const decimalSeparator = ref(',')
const outputType = ref<'Number' | 'String'>('Number')

const options = ref([
  { value: '', text: "''" },
  { value: 0, text: '0' },
])
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
        <td>Ref&lt;string | number | undefined&gt;</td>
        <td></td>
      </tr>
      <tr>
        <td>outputType</td>
        <td>❌</td>
        <td>'Number' | 'String'</td>
        <td>'Number'</td>
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
        <td>string</td>
        <td>','</td>
      </tr>
      <tr>
        <td>decimalSeparator</td>
        <td>❌</td>
        <td>string</td>
        <td>'.'</td>
      </tr>
      <tr>
        <td>emptyValue</td>
        <td>❌</td>
        <td>'' | 0</td>
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
          class="test"
          :emptyValue="emptyValue"
          :precision="Number(precision)"
          :thousandSeparator="thousandSeparator"
          :decimalSeparator="decimalSeparator"
          :outputType="outputType"
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
      <label class="label" for="emptyValue">emptyValue</label>
      <select v-model="emptyValue" id="emptyValue">
        <option v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>
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

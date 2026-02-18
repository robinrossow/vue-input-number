<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { formatMoney, unformat } from 'accounting-js'
export interface Props {
  modelValue: string | number | undefined,
  outputType?: 'Number' | 'String',

  min?: number,
  max?: number,

  precision?: number,
  thousandSeparator?: string | undefined,
  decimalSeparator?: string | undefined,

  currency?: string,
  currencySymbolPosition?: 'prefix' | 'suffix'

  emptyValue?: number | '',
}

const props = withDefaults(defineProps<Props>(), {
  outputType: 'Number',

  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,

  precision: 0,
  thousandSeparator: ',',
  decimalSeparator: '.',

  currency: '',
  currencySymbolPosition: 'prefix',

  emptyValue: '',
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

// number shown in the input field - changes depending on if focused or not
const displayNumber = ref('')

const focus = ref(false)

const symbolPosition = computed(() => {
  if (!props.currency) {
    return '%v'
  }
  return props.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
})

const realNumber = computed(() => {
  return minMax(unformat(displayNumber.value, props.decimalSeparator)) || 0
})

function format(value: number ) {
  return formatMoney(value, {
    symbol: props.currency,
    format: symbolPosition.value,

    thousand: props.thousandSeparator,
    decimal: props.decimalSeparator,
    precision: Number(props.precision)
  })
}

const blurNumber = computed(() => {
  return format(realNumber.value)
})

const focusNumber = computed(() => {
  return formatMoney(realNumber.value, {
    symbol: '',
    format: '%v',

    thousand: props.thousandSeparator,
    decimal: props.decimalSeparator,
    precision: Number(props.precision)
  })
})

function onBlurHandler(e: Event) {
  focus.value = false
  displayNumber.value = blurNumber.value
  updateModel()
  emit('blur', e)
}

function onFocusHandler(e: Event) {
  focus.value = true
  displayNumber.value = focusNumber.value
  emit('focus', e)
}

function onInputHandler() {
  if (!focus.value) {
    updateModel()
  }
}

function minMax(value: number) {
  if (value < props.min) {
    return props.min
  }
  if (value > props.max) {
    return props.max
  }
  return value
}

function setDisplayNumber(value: string | number | undefined) {
  if (!value) {
    displayNumber.value = props.emptyValue === '' ? '' : String(minMax(props.emptyValue))
    return
  }

  if (typeof value === 'string') {
    displayNumber.value = format(minMax(unformat(value, props.decimalSeparator)))
    return
  }

  displayNumber.value = format(minMax(value))
}

/**
 * Update parent component model value.
 */
function updateModel() {
  if (!realNumber.value) {
    emit('update:modelValue', props.emptyValue)
    return
  }
  const output = props.outputType.toLowerCase() === 'string' ? focusNumber.value : realNumber.value
  emit('update:modelValue', output)
}

onMounted(() => {
  setDisplayNumber(props.modelValue)
  updateModel()
})

watch(props, () => {
  // don't update if focussed
  if (focus.value) {
    return
  }
  setDisplayNumber(props.modelValue)
  updateModel()
})

</script>

<template>
  <input
      v-bind="$attrs"
      v-model="displayNumber"
      @blur="onBlurHandler"
      @input="onInputHandler"
      @focus="onFocusHandler"
  >
</template>

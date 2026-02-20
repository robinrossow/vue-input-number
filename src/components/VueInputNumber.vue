<script lang="ts" setup>
import { ref, computed, onMounted, watch, useTemplateRef } from 'vue'
import { formatNumber, unformat, toFixed } from 'accounting-js'

export interface Props {
  modelValue: string | number | undefined,
  outputType?: 'Number' | 'String',

  precision?: number,
  thousandSeparator?: string,
  decimalSeparator?: string,

  emptyValue?: '' | 0,
}

const props = withDefaults(defineProps<Props>(), {
  outputType: 'Number',

  precision: 0,
  thousandSeparator: ',',
  decimalSeparator: '.',

  emptyValue: '',
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const numberInput = useTemplateRef('number-input')

// number shown in the input field - changes depending on if focused or not
const displayNumber = ref('')

const focus = ref(false)

function format(value: number) {
  return formatNumber(value, {
    thousand: props.thousandSeparator,
    decimal: props.decimalSeparator,
    precision: Number(props.precision)
  })
}

const realNumber = computed(() => {
  return Number(toFixed(unformat(displayNumber.value, props.decimalSeparator), props.precision)) || 0
})

const formattedNumber = computed(() => {
  return format(realNumber.value)
})

function onBlurHandler(e: Event) {
  focus.value = false
  setDisplayNumber(numberInput.value!.value)
  emit('blur', e)
}

function onFocusHandler(e: Event) {
  focus.value = true
  emit('focus', e)
}

function onInputHandler() {
  updateModel()
}

function setDisplayNumber(value: string | number | undefined) {
  if (typeof value === 'undefined' || value === '') {
    displayNumber.value = props.emptyValue === 0 ? format(0) : ''
    return
  }
  if (typeof value === 'number') {
    displayNumber.value = format(value)
    return
  }

  displayNumber.value = format(unformat(value, props.decimalSeparator))
}

/**
 * Update parent component model value.
 */
function updateModel() {
  if (!numberInput.value!.value) {
    if (props.outputType.toLowerCase() === 'string') {
      if (props.emptyValue === 0) {
        emit('update:modelValue', format(0))
      } else {
        emit('update:modelValue', props.emptyValue)
      }
      return
    }
    if (props.outputType.toLowerCase() === 'number') {
      if (props.emptyValue === 0) {
        emit('update:modelValue', 0)
      } else {
        emit('update:modelValue', '')
      }
      return
    }
  }
  const output = props.outputType.toLowerCase() === 'string' ? formattedNumber.value : realNumber.value
  emit('update:modelValue', output)
}

onMounted(() => {
  setDisplayNumber(props.modelValue)
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
      ref="number-input"
      v-bind="$attrs"
      v-model="displayNumber"
      @blur="onBlurHandler"
      @input="onInputHandler"
      @focus="onFocusHandler"
  >
</template>

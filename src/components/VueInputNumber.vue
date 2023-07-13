<template>
    <input
        v-bind="$attrs"
        ref="inputElement"
        v-model="amount"
        :value="amount"
        @blur="onBlurHandler"
        @input="onInputHandler"
        @focus="onFocusHandler"
    >
</template>

<script lang="ts" setup>
import {ref, computed, watch} from 'vue'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import toFixed from 'accounting-js/lib/toFixed.js'
import unformat from 'accounting-js/lib/unformat.js'

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

const amount = ref('')
const focus = ref(false)
const inputElement = ref<HTMLInputElement>()

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const amountNumber = computed(() => {
    return unformatValue(amount.value)
})

const valueNumber = computed(() => {
    return unformatValue(props.modelValue)
})

const symbolPosition = computed(() => {
    if (!props.currency) {
        return '%v'
    }
    return props.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
})

if (props.modelValue !== undefined) {
    process(valueNumber.value)
    amount.value = format(valueNumber.value)
}

// watch all props
watch(props, () => {
    // don't update if focussed
    if (focus.value) {
        return
    }
    if (props.modelValue == undefined) {
        return
    }
    process(valueNumber.value)
    amount.value = format(valueNumber.value)
})

function onBlurHandler(e: Event) {
    focus.value = false
    emit('blur', e)
    amount.value = format(valueNumber.value)
}

function onFocusHandler(e: Event) {
    focus.value = true
    emit('focus', e)
    if (typeof valueNumber.value === 'string' && valueNumber.value === '') {
        return ''
    } else {
        amount.value = formatMoney(valueNumber.value, {
            symbol: '',
            format: '%v',
            thousand: '',
            decimal: props.decimalSeparator,
            precision: Number(props.precision)
        })
    }
}

function onInputHandler() {
    process(amountNumber.value)
}

/**
 * Validate value before update the component.
 */
function process(value: string | number) {
    if (typeof value === 'string' && value === '') {
        emit('update:modelValue', value)
    } else {
        value = Number(value)
        if (value >= props.max) {
            update(props.max)
            return
        }
        if (value <= props.min) {
            update(props.min)
            return
        }
        if (value > props.min && value < props.max) {
            update(value)
            return
        }
    }
}

/**
 * Update parent component model value.
 */
function update(value: string | number) {
    const fixedValue = toFixed(value, props.precision)
    const output = props.outputType.toLowerCase() === 'string' ? fixedValue : Number(fixedValue)
    emit('update:modelValue', output)
}

/**
 * Format value using symbol and separator.
 */
function format(value: string | number) {
    if (typeof value === 'string' && value === '') {
        return ''
    }
    return formatMoney(value, {
        symbol: props.currency,
        format: symbolPosition.value,
        precision: Number(props.precision),
        decimal: props.decimalSeparator,
        thousand: props.thousandSeparator
    })
}

/**
 * Remove symbol and separator.
 */
function unformatValue(value: string | number | undefined) {
    const toUnformat = typeof value === 'string' && value === '' ? props.emptyValue : value
    if (typeof toUnformat === 'string' && toUnformat === '') {
        return ''
    }
    return unformat(toUnformat, props.decimalSeparator)
}
</script>

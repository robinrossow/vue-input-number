<template>
    <input
            v-if="!readOnly"
            :placeholder="placeholder"
            :disabled="disabled"
            v-model="modelValue"
            :type="allowClear ? 'search' : 'tel'"
            @blur="onBlurHandler"
            @input="onInputHandler"
            @focus="onFocusHandler"
            @change="onChangeHandler"
    >
    <span
        v-if="readOnly"
        :class="{ readOnlyClass }"
    >{{ amount }}</span>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import toFixed from 'accounting-js/lib/toFixed.js'
import unformat from 'accounting-js/lib/unformat.js'


const modelValue = defineModel<string | number>({required: true})

export interface Props {
    modelValue: string | number,
    allowClear?: boolean,
    currency?: string,
    max?: number,
    min?: number,
    minus?: boolean,
    placeholder?: string,
    emptyValue?: number | string,
    precision?: number,
    separator?: string,
    thousandSeparator?: string | undefined,
    decimalSeparator?: string | undefined,
    outputType: 'Number' | 'String',
    readOnly?: boolean,
    readOnlyClass?: string,
    disabled?: boolean,
    currencySymbolPosition?: 'prefix' | 'suffix'
}

const props = withDefaults(defineProps<Props>(), {
    allowClear: false,
    currency: '',
    max: Number.MAX_SAFE_INTEGER,
    min: Number.MAX_SAFE_INTEGER,
    minus: false,
    placeholder: '',
    emptyValue: '',
    precision: 0,
    separator: ',',
    thousandSeparator: undefined,
    decimalSeparator: undefined,
    outputType: 'Number',
    readOnly: false,
    readOnlyClass: '',
    disabled: false,
    currencySymbolPosition: 'prefix',
})

const amount = ref('')

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const amountNumber = computed(() => {
    return unformatValue(amount.value)
})

const valueNumber = computed(() => {
    return unformatValue(modelValue.value)
})

const decimalSeparatorSymbol = computed(() => {
    if (typeof props.decimalSeparator !== 'undefined') {
        return props.decimalSeparator
    }
    if (props.separator === ',') {
        return '.'
    }
    return ','
})

const thousandSeparatorSymbol = computed(() => {
    if (typeof props.thousandSeparator !== 'undefined') {
        return props.thousandSeparator
    }
    if (props.separator === '.') {
        return '.'
    }
    if (props.separator === 'space') {
        return ' '
    }
    return ','
})

const symbolPosition = computed(() => {
    if (!props.currency) {
        return '%v'
    }
    return props.currencySymbolPosition === 'suffix' ? '%v %s' : '%s %v'
})

// Set default value props when valueNumber has some value
if (valueNumber.value || isDeliberatelyZero()) {
    process(valueNumber.value)
    amount.value = format(valueNumber.value)

    // In case of delayed props value.
    setTimeout(() => {
        process(valueNumber.value)
        amount.value = format(valueNumber.value)
    }, 500)
}

function onChangeHandler (e: Event) {
    emit('change', e)
}

function onBlurHandler (e: Event) {
    emit('blur', e)
    amount.value = format(valueNumber.value)
}

function onFocusHandler (e: Event) {
    emit('focus', e)
    if(typeof valueNumber.value === 'string' && valueNumber.value === '') {
        return ''
    } else {
        amount.value = formatMoney(valueNumber.value, {
            symbol: '',
            format: '%v',
            thousand: '',
            decimal: decimalSeparatorSymbol.value,
            precision: Number(props.precision)
        })
    }
}

function onInputHandler () {
    process(amountNumber.value)
}

/**
 * Validate value before update the component.
 */
function process (value: string | number) {
    if (typeof value === 'string' && value === '') {
        emit('update:modelValue', value)
    } else {
        value = parseFloat(value + '')
        if (value >= props.max) {
            update(props.max)
        }
        if (value <= props.min) {
            update(props.min)
        }
        if (value > props.min && value < props.max) {
            update(value)
        }
        if (!props.minus && value < 0) {
            props.min >= 0 ? update(props.min) : update(0)
        }
    }
}

/**
 * Update parent component model value.
 */
function update (value: string | number) {
    const fixedValue = toFixed(value, props.precision)
    const output = props.outputType.toLowerCase() === 'string' ? fixedValue : Number(fixedValue)
    emit('update:modelValue', output)
}

/**
 * Format value using symbol and separator.
 */
function format (value: string | number) {
    if(typeof value === 'string' && value === '') {
        return ''
    }
    return formatMoney(value, {
        symbol: props.currency,
        format: symbolPosition.value,
        precision: Number(props.precision),
        decimal: decimalSeparatorSymbol.value,
        thousand: thousandSeparatorSymbol.value
    })
}

/**
 * Remove symbol and separator.
 */
function unformatValue (value: string | number) {
    const toUnformat = typeof value === 'string' && value === '' ? props.emptyValue : value
    if(typeof toUnformat === 'string' && toUnformat === '') {
        return ''
    }
    return unformat(toUnformat, decimalSeparatorSymbol.value)
}

/**
 * Check if value was deliberately set to zero and not just evaluated
 */
function isDeliberatelyZero () {
    return valueNumber.value === 0 && modelValue.value !== ''
}
</script>

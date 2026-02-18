import { mount } from '@vue/test-utils'
import VueInputNumber from './VueInputNumber.vue'
import { test, expect, beforeEach } from 'vitest'

let wrapper:any
beforeEach(() => {
    wrapper = mount(VueInputNumber, {
        props: {
            modelValue: 9001,
            id: 'vue-input-number'
        }
    })
})

test('Component is rendered', async() => {
    expect(wrapper.find('#vue-input-number').exists()).toBe(true)
})

test('Default is formatted correctly', async() => {
    expect((wrapper.find('#vue-input-number').element).value).toBe('9,001')
})

test('Optional attributes are set', async() => {
    await wrapper.setProps({
        placeholder: 'test placeholder',
        class: 'test-class',
    })
    expect(wrapper.find('#vue-input-number').attributes('placeholder')).toBe('test placeholder')
    expect(wrapper.find('#vue-input-number').attributes('class')).toBe('test-class')
})
test('Output types are working correctly', async() => {
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001]])
    await wrapper.setProps({
        outputType: 'String'
    })
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001],['9,001']])
})

test('Min and max are working', async() => {
    await wrapper.setProps({
        min: 100,
        max: 200,
        modelValue: 50
    })
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001],[100]])

    await wrapper.find('#vue-input-number').setValue(300)
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001],[100],[200]])
})

test('Precision works', async() => {
    await wrapper.setProps({
        precision: 2,
        modelValue: 100.22
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('100.22')
})

test('Thousand separator works', async() => {
    await wrapper.setProps({
        thousandSeparator: ' ',
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('9 001')
})

test('Decimal separator works', async() => {
    await wrapper.setProps({
        decimalSeparator: ',',
        precision: 2,
        modelValue: 13.37
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('13,37')
})

test('Currency works', async() => {
    await wrapper.setProps({
        currency: '€',
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('€ 9,001')
    await wrapper.setProps({
        currencySymbolPosition: 'suffix',
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('9,001 €')
})

test('Empty value works', async() => {
    await wrapper.setProps({
        modelValue: '',
        emptyValue: 1337
    })
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001],[1337]])
})

test('should return empty string when focused and value is empty string', async() => {
    await wrapper.setProps({
        modelValue: ''
    })
    await wrapper.find('#vue-input-number').trigger('focus')
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001],['']])
})
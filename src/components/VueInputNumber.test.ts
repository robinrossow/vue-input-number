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

test('Output types are working correctly', async() => {
    await wrapper.setProps({
        outputType: 'String'
    })
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([['9,001']])

    await wrapper.setProps({
        outputType: 'Number'
    })
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([['9,001'], [9001]])
})

test('Precision works', async() => {
    await wrapper.setProps({
        precision: 2,
        modelValue: 100.222
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('100.22')
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[100.22]])
})

test('Thousand separator works', async() => {
    await wrapper.setProps({
        thousandSeparator: ' ',
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('9 001')
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[9001]])
})

test('Decimal separator works', async() => {
    await wrapper.setProps({
        decimalSeparator: ',',
        precision: 2,
        modelValue: 13.37
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('13,37')
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[13.37]])
})

test('Empty value 0 works', async() => {
    await wrapper.setProps({
        modelValue: '',
        emptyValue: 0
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('0')
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([[0]])
})

test('Empty value 0 output string works', async() => {
    await wrapper.setProps({
        modelValue: '',
        emptyValue: 0,
        outputType: 'String'
    })
    expect((wrapper.find('#vue-input-number').element).value).toBe('0')
    expect(wrapper.emitted()['update:modelValue']).toStrictEqual([['0']])
})

<script setup lang="ts">
import { Input } from '../Input'

type InputSize = 'sm' | 'md'
type InputValue = string | number

withDefaults(
  defineProps<{
    /** 搜索关键词 */
    modelValue?: InputValue
    /** 占位文案 */
    placeholder?: string
    /** 尺寸 */
    size?: InputSize
    /** 禁用 */
    disabled?: boolean
    /** 只读 */
    readonly?: boolean
    /** 展示清除按钮 */
    clearable?: boolean
    /** 错误态 */
    error?: boolean
    /** 错误提示 */
    errorMessage?: string
    /** 原生 name */
    name?: string
    /** 原生 autocomplete */
    autocomplete?: string
  }>(),
  {
    modelValue: '',
    placeholder: '搜索',
    size: 'md',
    disabled: false,
    readonly: false,
    clearable: true,
    error: false,
    errorMessage: '',
    name: undefined,
    autocomplete: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: InputValue): void
  (e: 'change', value: InputValue): void
  (e: 'focus', ev: FocusEvent): void
  (e: 'blur', ev: FocusEvent): void
  (e: 'clear', ev: MouseEvent): void
}>()
</script>

<template>
  <Input
    class="dp-search-input"
    type="search"
    prefix-icon="search"
    :model-value="modelValue"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :readonly="readonly"
    :clearable="clearable"
    :error="error"
    :error-message="errorMessage"
    :name="name"
    :autocomplete="autocomplete"
    @update:model-value="emit('update:modelValue', $event)"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @clear="emit('clear', $event)"
  >
    <template v-if="$slots.prefix" #prefix><slot name="prefix" /></template>
    <template v-if="$slots.suffix" #suffix><slot name="suffix" /></template>
  </Input>
</template>

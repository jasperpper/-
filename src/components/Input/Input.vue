<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '../Icon'

type InputSize = 'sm' | 'md'
type InputValue = string | number

const props = withDefaults(
  defineProps<{
    /** 输入值 */
    modelValue?: InputValue
    /** 原生 input type */
    type?: string
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
    /** 内置前置图标 */
    prefixIcon?: string
    /** 内置后置图标 */
    suffixIcon?: string
    /** 原生 name */
    name?: string
    /** 原生 autocomplete */
    autocomplete?: string
  }>(),
  {
    modelValue: '',
    type: 'text',
    placeholder: '',
    size: 'md',
    disabled: false,
    readonly: false,
    clearable: false,
    error: false,
    errorMessage: '',
    prefixIcon: undefined,
    suffixIcon: undefined,
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

const classes = computed(() => [
  'dp-input',
  `dp-input--${props.size}`,
  {
    'dp-input--disabled': props.disabled,
    'dp-input--readonly': props.readonly,
    'dp-input--error': props.error,
  },
])

const hasValue = computed(() => String(props.modelValue ?? '').length > 0)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly)

function onInput(ev: Event) {
  const target = ev.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function onChange(ev: Event) {
  const target = ev.target as HTMLInputElement
  emit('change', target.value)
}

function onClear(ev: MouseEvent) {
  emit('update:modelValue', '')
  emit('clear', ev)
}
</script>

<template>
  <label :class="classes">
    <span v-if="$slots.prefix || prefixIcon" class="dp-input__affix" aria-hidden="true">
      <slot name="prefix">
        <Icon v-if="prefixIcon" :name="prefixIcon" :size="size === 'sm' ? 16 : 20" />
      </slot>
    </span>

    <input
      class="dp-input__control"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-invalid="error || undefined"
      @input="onInput"
      @change="onChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />

    <button
      v-if="showClear"
      class="dp-input__clear"
      type="button"
      aria-label="清除"
      @click="onClear"
    >
      <Icon name="close" :size="14" />
    </button>

    <span v-else-if="$slots.suffix || suffixIcon" class="dp-input__affix" aria-hidden="true">
      <slot name="suffix">
        <Icon v-if="suffixIcon" :name="suffixIcon" :size="size === 'sm' ? 16 : 20" />
      </slot>
    </span>
  </label>

  <p v-if="error && errorMessage" class="dp-input__message">{{ errorMessage }}</p>
</template>

<style scoped>
.dp-input {
  display: inline-flex;
  align-items: center;
  width: 240px;
  border: 1px solid var(--dp-border-gray);
  border-radius: var(--dp-radius-m);
  background: var(--dp-card);
  color: var(--dp-foreground);
  font-family: var(--dp-font-zh);
  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}
.dp-input:hover:not(.dp-input--disabled) {
  border-color: var(--dp-primary);
  background: var(--dp-button-outline-hover);
}
.dp-input:focus-within {
  border-color: var(--dp-foreground);
  box-shadow: 0 0 0 3px var(--dp-button-focus-ring);
}
.dp-input--sm {
  height: 28px;
  padding: 0 var(--dp-space-4);
  gap: var(--dp-space-2);
}
.dp-input--md {
  height: 32px;
  padding: 0 var(--dp-space-5);
  gap: var(--dp-space-3);
}
.dp-input--error {
  border-color: var(--dp-color-error);
}
.dp-input--disabled {
  background: var(--dp-button-disabled-bg);
  color: var(--dp-button-disabled-fg);
  cursor: not-allowed;
}
.dp-input--readonly {
  background: var(--dp-muted-gray);
}
.dp-input__control {
  min-width: 0;
  flex: 1;
  border: 0;
  outline: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: var(--dp-line-height-body);
}
.dp-input__control::placeholder {
  color: var(--dp-foreground-tertiary);
}
.dp-input__control:disabled {
  cursor: not-allowed;
}
.dp-input__affix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--dp-muted-foreground);
}
.dp-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--dp-muted-foreground);
  cursor: pointer;
}
.dp-input__clear:hover {
  color: var(--dp-foreground);
}
.dp-input__message {
  margin: var(--dp-space-1) 0 0;
  color: var(--dp-color-error);
  font-family: var(--dp-font-zh);
  font-size: var(--dp-font-size-caption);
  line-height: var(--dp-line-height-caption);
}
</style>

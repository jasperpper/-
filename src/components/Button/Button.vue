<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'
type ButtonSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    /** 视觉变体：primary(黑底白字) / secondary(品牌浅底) / outline(描边) / ghost(透明) / destructive(危险操作) */
    variant?: ButtonVariant
    /** 尺寸：sm=28px / md=32px */
    size?: ButtonSize
    /** 是否只有图标（正方形按钮） */
    iconOnly?: boolean
    /** 图标位置 */
    iconPosition?: 'left' | 'right'
    /** 禁用 */
    disabled?: boolean
    /** 加载中，加载时不触发 click */
    loading?: boolean
    /** 选中/激活态，适用于 toggle 类按钮 */
    active?: boolean
    /** 宽度撑满容器 */
    block?: boolean
    /** 原生 type */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
    iconPosition: 'left',
    disabled: false,
    loading: false,
    active: false,
    block: false,
    type: 'button',
  },
)

const emit = defineEmits<{ (e: 'click', ev: MouseEvent): void }>()

const classes = computed(() => [
  'dp-button',
  `dp-button--${props.variant}`,
  `dp-button--${props.size}`,
  { 'dp-button--icon-only': props.iconOnly },
  { 'dp-button--icon-right': props.iconPosition === 'right' },
  { 'dp-button--loading': props.loading },
  { 'dp-button--active': props.active },
  { 'dp-button--block': props.block },
])

const isDisabled = computed(() => props.disabled || props.loading)

function onClick(ev: MouseEvent) {
  if (isDisabled.value) return
  emit('click', ev)
}
</script>

<template>
  <button :class="classes" :type="type" :disabled="isDisabled" :aria-busy="loading || undefined" @click="onClick">
    <span v-if="loading || $slots.loading" class="dp-button__loading" aria-hidden="true">
      <slot name="loading">···</slot>
    </span>
    <span v-else-if="$slots.icon" class="dp-button__icon"><slot name="icon" /></span>
    <span v-if="!iconOnly" class="dp-button__label"><slot /></span>
  </button>
</template>

<style scoped>
.dp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dp-space-2);
  border: 1px solid transparent;
  border-radius: var(--dp-radius-xl);
  font-family: var(--dp-font-zh);
  font-size: var(--dp-font-size-body);
  font-weight: var(--dp-font-weight-regular);
  line-height: 1.429;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.dp-button--block {
  display: flex;
  width: 100%;
}
.dp-button--icon-right {
  flex-direction: row-reverse;
}

.dp-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--dp-button-focus-ring);
}

/* ---- sizes ---- */
.dp-button--md {
  height: 32px;
  padding: var(--dp-space-3) var(--dp-space-8);
}
.dp-button--sm {
  height: 28px;
  padding: var(--dp-space-2) var(--dp-space-6);
  font-size: var(--dp-font-size-caption);
}
.dp-button--icon-only.dp-button--md {
  width: 32px;
  padding: var(--dp-space-3);
}
.dp-button--icon-only.dp-button--sm {
  width: 28px;
  padding: var(--dp-space-2);
}

/* ---- primary ---- */
.dp-button--primary {
  background: var(--dp-action);
  color: var(--dp-foreground-on-action);
}
.dp-button--primary:hover {
  background: var(--dp-button-primary-hover);
}
.dp-button--primary:active {
  background: var(--dp-button-primary-pressed);
}

/* ---- secondary (soft brand) ---- */
.dp-button--secondary {
  background: var(--dp-primary-bg);
  color: var(--dp-foreground-emphasized);
  border-color: transparent;
}
.dp-button--secondary:hover {
  background: var(--dp-button-secondary-hover);
}

/* ---- outline ---- */
.dp-button--outline {
  background: var(--dp-card);
  color: var(--dp-foreground);
  border-color: var(--dp-border-gray);
}
.dp-button--outline:hover {
  background: var(--dp-button-outline-hover);
}

/* ---- ghost ---- */
.dp-button--ghost {
  background: transparent;
  color: var(--dp-foreground);
}
.dp-button--ghost:hover {
  background: var(--dp-button-ghost-hover);
}

/* ---- destructive ---- */
.dp-button--destructive {
  background: var(--dp-destructive);
  color: var(--dp-foreground-on-solid);
}
.dp-button--destructive:hover {
  background: var(--dp-button-destructive-hover);
}

/* ---- active ---- */
.dp-button--active:not(:disabled) {
  border-color: var(--dp-primary-solid);
  color: var(--dp-foreground-emphasized);
}

/* ---- disabled ---- */
.dp-button:disabled {
  background: var(--dp-button-disabled-bg);
  color: var(--dp-button-disabled-fg);
  border-color: transparent;
  cursor: not-allowed;
}

.dp-button__icon,
.dp-button__loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.dp-button__icon :deep(svg) {
  width: 1em;
  height: 1em;
}
.dp-button--md .dp-button__icon {
  font-size: 16px;
}
.dp-button--icon-only.dp-button--md .dp-button__icon {
  font-size: 20px;
}
.dp-button__loading {
  min-width: 1em;
  font-weight: var(--dp-font-weight-semibold);
  letter-spacing: 1px;
}
.dp-button--loading {
  cursor: wait;
}
</style>

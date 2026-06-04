<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '../Icon'

type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'keyword' | 'disabled'
type TagSize = 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    /** 语义变体 */
    variant?: TagVariant
    /** 尺寸 */
    size?: TagSize
    /** 选中态（描边高亮） */
    selected?: boolean
    /** 禁用 */
    disabled?: boolean
    /** 可关闭（显示 × 并触发 close 事件） */
    closable?: boolean
    /** 内置图标名 */
    icon?: string
  }>(),
  {
    variant: 'default',
    size: 'sm',
    selected: false,
    disabled: false,
    closable: false,
    icon: undefined,
  },
)

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
  (e: 'close', ev: MouseEvent): void
}>()

const isDisabled = computed(() => props.disabled || props.variant === 'disabled')

const classes = computed(() => [
  'dp-tag',
  `dp-tag--${props.variant}`,
  `dp-tag--${props.size}`,
  { 'dp-tag--selected': props.selected },
  { 'dp-tag--disabled': isDisabled.value },
])

function onClick(ev: MouseEvent) {
  if (isDisabled.value) return
  emit('click', ev)
}

function onClose(ev: MouseEvent) {
  ev.stopPropagation()
  if (isDisabled.value) return
  emit('close', ev)
}
</script>

<template>
  <span :class="classes" :aria-disabled="isDisabled || undefined" @click="onClick">
    <span v-if="$slots.icon || icon" class="dp-tag__icon" aria-hidden="true">
      <slot name="icon">
        <Icon v-if="icon" :name="icon" :size="size === 'sm' ? 16 : 20" />
      </slot>
    </span>
    <slot />
    <button
      v-if="closable && !isDisabled"
      class="dp-tag__close"
      type="button"
      aria-label="close"
      @click="onClose"
    >
      ×
    </button>
  </span>
</template>

<style scoped>
.dp-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--dp-space-2);
  border: 1px solid transparent;
  border-radius: var(--dp-radius-pill);
  font-family: var(--dp-font-zh);
  font-weight: var(--dp-font-weight-regular);
  white-space: nowrap;
}
.dp-tag--sm {
  height: 24px;
  padding: 0 var(--dp-space-5);
  font-size: var(--dp-font-size-caption);
  line-height: 1.333;
}
.dp-tag--md {
  height: 28px;
  padding: 0 var(--dp-space-6);
  font-size: var(--dp-font-size-body);
  line-height: 1.429;
}

.dp-tag--default {
  background: var(--dp-muted);
  color: var(--dp-foreground-body);
}
.dp-tag--primary {
  background: var(--dp-primary-bg);
  color: var(--dp-foreground-emphasized);
}
.dp-tag--success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--dp-color-success);
}
.dp-tag--warning {
  background: rgba(245, 158, 11, 0.1);
  color: var(--dp-color-warning);
}
.dp-tag--info {
  background: rgba(59, 130, 246, 0.1);
  color: var(--dp-color-info);
}
.dp-tag--keyword {
  background: var(--dp-primary-bg);
  color: var(--dp-foreground-emphasized);
}
.dp-tag--disabled {
  background: var(--dp-button-disabled-bg);
  color: var(--dp-button-disabled-fg);
  cursor: not-allowed;
}

.dp-tag--selected {
  border-color: var(--dp-primary-solid);
  color: var(--dp-foreground-emphasized);
}

.dp-tag__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.dp-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  font-size: 14px;
  line-height: 1;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
}
.dp-tag__close:hover {
  opacity: 1;
}
</style>

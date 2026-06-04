<script setup lang="ts">
import { computed } from 'vue'

const iconPaths = {
  search: [
    'M10.5 17a6.5 6.5 0 1 1 4.596-11.096A6.5 6.5 0 0 1 10.5 17Zm0-2a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z',
    'M14.2 15.6 19 20.4 20.4 19 15.6 14.2Z',
  ],
  calendar: [
    'M7 3h2v2h6V3h2v2h2.5A2.5 2.5 0 0 1 22 7.5v11A2.5 2.5 0 0 1 19.5 21h-15A2.5 2.5 0 0 1 2 18.5v-11A2.5 2.5 0 0 1 4.5 5H7V3Zm12.5 7h-15v8.5h15V10ZM4.5 8h15v-.5a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5V8Z',
  ],
  panelRight: [
    'M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13ZM14 5v14h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H14ZM12 19V5H6.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H12Z',
  ],
  pencil: [
    'M16.8 3.6a2.1 2.1 0 0 1 3 3L8.7 17.7 4 19l1.3-4.7L16.8 3.6Zm1.6 1.4a.2.2 0 0 0-.3 0L7.1 16l-.3 1.2 1.2-.3L19 5.9a.2.2 0 0 0 0-.3L18.4 5Z',
  ],
  document: [
    'M5 4.5A2.5 2.5 0 0 1 7.5 2H14l5 5v12.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 19.5v-15ZM13 4H7.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8h-4V4Zm2 .4V6h1.6L15 4.4Z',
  ],
  message: [
    'M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.4 4.1A1 1 0 0 1 4 19.4V5.5ZM6.5 5a.5.5 0 0 0-.5.5v11.6L9.2 14h8.3a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11Z',
  ],
  report: [
    'M5 4.5A2.5 2.5 0 0 1 7.5 2h9A2.5 2.5 0 0 1 19 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 19.5v-15ZM7.5 4a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5h-9Zm2 4h5v2h-5V8Zm0 4h5v2h-5v-2Zm0 4h3v2h-3v-2Z',
  ],
  square: ['M5 5.5A2.5 2.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5v9A2.5 2.5 0 0 1 16.5 17h-9A2.5 2.5 0 0 1 5 14.5v-9ZM7.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-9Z'],
  chevronDown: ['M6.3 8.7 12 14.4l5.7-5.7 1.4 1.4-6.4 6.4a1 1 0 0 1-1.4 0L4.9 10.1l1.4-1.4Z'],
  arrowUp: ['M12 4.6 18.4 11 17 12.4l-4-4V20h-2V8.4l-4 4L5.6 11 12 4.6Z'],
  zap: ['M13 2 4 13h6l-1 9 9-12h-6l1-8Z'],
  history: [
    'M4 5v5h5V8H7.4A6 6 0 1 1 6 12H4a8 8 0 1 0 2.1-5.4V5H4Z',
  ],
  ellipsisVertical: [
    'M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  ],
  send: ['M3 4.5 21 12 3 19.5V14l10-2-10-2V4.5Z'],
  plus: ['M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z'],
  close: ['M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z'],
} as const

const props = withDefaults(
  defineProps<{
    /** 图标名 */
    name: string
    /** 尺寸，设计稿目前有 16 / 20 / 24 */
    size?: 16 | 20 | 24 | number
    /** 图标颜色 */
    color?: string
    /** 是否为纯装饰图标 */
    decorative?: boolean
    /** 非装饰图标的可访问名称 */
    label?: string
  }>(),
  {
    size: 16,
    color: 'currentColor',
    decorative: true,
    label: undefined,
  },
)

const paths = computed(() => iconPaths[props.name as keyof typeof iconPaths] ?? iconPaths.square)
const ariaHidden = computed(() => (props.decorative ? 'true' : undefined))
const role = computed(() => (props.decorative ? undefined : 'img'))
</script>

<template>
  <svg
    class="dp-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="color"
    :aria-hidden="ariaHidden"
    :aria-label="decorative ? undefined : label"
    :role="role"
  >
    <path v-for="path in paths" :key="path" :d="path" />
  </svg>
</template>

<style scoped>
.dp-icon {
  display: inline-block;
  flex: none;
  vertical-align: -0.125em;
}
</style>

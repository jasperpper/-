<script setup lang="ts">
import { computed } from 'vue'
import { rawNodeMap, rawNodes, type RawNodeMeta } from './registry'

const props = withDefaults(
  defineProps<{
    /** Design node name, for example `Btn/DP/CreateTopic/md`. */
    name?: string
    /** Design node id, used when name is not supplied. */
    id?: string
    /** Hide metadata label when embedding raw node snapshots. */
    hideLabel?: boolean
  }>(),
  {
    name: '',
    id: '',
    hideLabel: false,
  },
)

const node = computed<RawNodeMeta | undefined>(() => {
  if (props.name) return rawNodeMap[props.name]
  if (props.id) return rawNodes.find((item) => item.id === props.id)
  return undefined
})

const category = computed(() => node.value?.name.split('/').slice(0, 3).join(' / ') || 'Unknown')

function colorValue(value: unknown, fallback: string) {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'color' in value) {
    const color = (value as { color?: unknown }).color
    if (typeof color === 'string') return color
  }
  if (value && typeof value === 'object' && 'colors' in value) {
    return 'var(--dp-gradient-brand-tint)'
  }
  return fallback
}

function sizeValue(value: unknown, fallback: number, max: number) {
  if (typeof value === 'number') return `${Math.max(20, Math.min(value, max))}px`
  return `${fallback}px`
}

function radiusValue(value: unknown) {
  if (typeof value === 'number') return value > 100 ? '9999px' : `${value}px`
  if (Array.isArray(value) && typeof value[0] === 'number') return `${value[0]}px`
  return 'var(--dp-radius-m)'
}

const previewStyle = computed(() => {
  const current = node.value
  return {
    width: sizeValue(current?.width, 180, 760),
    minHeight: sizeValue(current?.height, 44, 320),
    borderRadius: radiusValue(current?.cornerRadius),
    background: colorValue(current?.fill, 'var(--dp-card)'),
    borderColor: colorValue(current?.stroke, 'var(--dp-border)'),
    opacity: current?.opacity ?? 1,
  }
})
</script>

<template>
  <article class="dp-raw-node">
    <div v-if="node" class="dp-raw-node__preview" :style="previewStyle">
      <span class="dp-raw-node__type">{{ node.type }}</span>
      <strong>{{ node.name.split('/').slice(-2).join(' / ') }}</strong>
      <small>{{ category }}</small>
      <slot :node="node" />
    </div>
    <div v-else class="dp-raw-node__missing">Raw node not found</div>
    <footer v-if="node && !hideLabel">
      <code>{{ node.exportName }}</code>
      <span>{{ node.id }}</span>
    </footer>
  </article>
</template>

<style scoped>
.dp-raw-node {
  display: grid;
  gap: var(--dp-space-2);
  font-family: var(--dp-font-zh);
}
.dp-raw-node__preview {
  position: relative;
  display: grid;
  align-content: center;
  gap: var(--dp-space-1);
  padding: var(--dp-space-5);
  border: 1px solid var(--dp-border);
  color: var(--dp-foreground);
  overflow: hidden;
}
.dp-raw-node__preview strong {
  max-width: 100%;
  overflow: hidden;
  font-size: var(--dp-font-size-caption);
  line-height: var(--dp-line-height-caption);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dp-raw-node__preview small,
.dp-raw-node__type,
.dp-raw-node footer {
  color: var(--dp-muted-foreground);
  font-size: 11px;
  line-height: 16px;
}
.dp-raw-node__type {
  position: absolute;
  top: var(--dp-space-2);
  right: var(--dp-space-3);
}
.dp-raw-node footer {
  display: flex;
  justify-content: space-between;
  gap: var(--dp-space-2);
  max-width: 220px;
}
.dp-raw-node code {
  overflow: hidden;
  color: var(--dp-foreground-body);
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dp-raw-node__missing {
  padding: var(--dp-space-6);
  border: 1px dashed var(--dp-border-gray);
  border-radius: var(--dp-radius-m);
  color: var(--dp-muted-foreground);
}
</style>

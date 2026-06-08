<script setup lang="ts">
import { computed } from 'vue'
import RawNode from './RawNode.vue'
import { rawNodes } from './registry'

const props = withDefaults(
  defineProps<{
    /** Filter by raw design node name. */
    query?: string
    /** Limit rendered nodes for lightweight previews. */
    limit?: number
  }>(),
  {
    query: '',
    limit: 80,
  },
)

const filteredNodes = computed(() => {
  const q = props.query.trim().toLowerCase()
  const nodes = q ? rawNodes.filter((node) => node.name.toLowerCase().includes(q)) : rawNodes
  return nodes.slice(0, props.limit)
})
</script>

<template>
  <section class="dp-raw-gallery">
    <header>
      <div>
        <strong>Raw Components</strong>
        <p>{{ filteredNodes.length }} / {{ rawNodes.length }} design node snapshots</p>
      </div>
      <slot name="actions" />
    </header>
    <div class="dp-raw-gallery__grid">
      <RawNode v-for="node in filteredNodes" :key="node.id" :name="node.name" />
    </div>
  </section>
</template>

<style scoped>
.dp-raw-gallery {
  display: grid;
  gap: var(--dp-space-8);
  font-family: var(--dp-font-zh);
}
.dp-raw-gallery header {
  display: flex;
  justify-content: space-between;
  gap: var(--dp-space-4);
}
.dp-raw-gallery strong {
  color: var(--dp-foreground);
}
.dp-raw-gallery p {
  margin: var(--dp-space-1) 0 0;
  color: var(--dp-muted-foreground);
  font-size: var(--dp-font-size-caption);
}
.dp-raw-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--dp-space-8);
  align-items: start;
}
</style>

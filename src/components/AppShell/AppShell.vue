<script setup lang="ts">
withDefaults(
  defineProps<{
    collapsedNav?: boolean
  }>(),
  { collapsedNav: false },
)
</script>

<template>
  <div class="dp-app-shell" :class="{ 'dp-app-shell--collapsed': collapsedNav }">
    <aside v-if="$slots.sidebar" class="dp-app-shell__sidebar">
      <slot name="sidebar" />
    </aside>
    <div class="dp-app-shell__main">
      <slot name="topbar" />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dp-app-shell {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  min-height: 100vh;
  background: var(--dp-background);
  color: var(--dp-foreground);
  font-family: var(--dp-font-zh);
}
.dp-app-shell--collapsed {
  grid-template-columns: 64px minmax(0, 1fr);
}
.dp-app-shell__sidebar {
  background: var(--dp-card);
  border-right: 1px solid var(--dp-divider);
}
.dp-app-shell__main {
  min-width: 0;
}
.dp-app-shell main {
  padding: var(--dp-space-12);
}
</style>

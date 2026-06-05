<script setup lang="ts">
type GenericItem = Record<string, unknown>

withDefaults(
  defineProps<{
    title?: string
    label?: string
    description?: string
    content?: string
    modelValue?: string | number | boolean
    items?: GenericItem[]
    options?: GenericItem[]
    columns?: GenericItem[]
    data?: GenericItem[]
    icon?: string
    loading?: boolean
    disabled?: boolean
    selected?: boolean
    collapsed?: boolean
  }>(),
  {
    title: '',
    label: '',
    description: '',
    content: '',
    modelValue: '',
    items: () => [],
    options: () => [],
    columns: () => [],
    data: () => [],
    icon: '',
    loading: false,
    disabled: false,
    selected: false,
    collapsed: false,
  },
)

const emit = defineEmits<{
  (e: 'click', ev: MouseEvent): void
  (e: 'select', item: GenericItem): void
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'submit', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
}>()

function itemLabel(item: GenericItem) {
  return String(item.label ?? item.title ?? item.name ?? item.value ?? '')
}

function itemValue(item: GenericItem) {
  return (item.value ?? item.key ?? item.id ?? item.label ?? item.title ?? '') as string | number
}
</script>

<template>
  <section
    class="dp-generated"
    :class="{ 'dp-generated--selected': selected, 'dp-generated--disabled': disabled }"
    :aria-disabled="disabled || undefined"
    @click="!disabled && emit('click', $event)"
  >
    <header v-if="title || label || $slots.header" class="dp-generated__header">
      <div>
        <strong>{{ title || label }}</strong>
        <p v-if="description">{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="dp-generated__actions"><slot name="actions" /></div>
    </header>

    <div v-if="loading" class="dp-generated__muted"><slot name="loading">加载中...</slot></div>

    <table v-else-if="columns.length && data.length" class="dp-generated__table">
      <thead>
        <tr><th v-for="column in columns" :key="itemValue(column)">{{ itemLabel(column) }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="String(itemValue(row))" @click.stop="emit('select', row)">
          <td v-for="column in columns" :key="itemValue(column)">{{ row[String(column.key ?? column.value ?? column.label)] }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="options.length" class="dp-generated__options">
      <button
        v-for="option in options"
        :key="itemValue(option)"
        type="button"
        :class="{ active: itemValue(option) === modelValue }"
        @click.stop="emit('update:modelValue', itemValue(option)); emit('change', itemValue(option)); emit('select', option)"
      >
        {{ itemLabel(option) }}
      </button>
    </div>

    <div v-else-if="items.length" class="dp-generated__list">
      <button v-for="item in items" :key="itemValue(item)" type="button" @click.stop="emit('select', item)">
        {{ itemLabel(item) }}
      </button>
    </div>

    <p v-if="content" class="dp-generated__content">{{ content }}</p>
    <slot />
    <footer v-if="$slots.footer" class="dp-generated__footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.dp-generated {
  display: grid;
  gap: var(--dp-space-4);
  padding: var(--dp-space-8);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius-lg);
  background: var(--dp-card);
  color: var(--dp-foreground);
  font-family: var(--dp-font-zh);
}
.dp-generated--selected {
  border-color: var(--dp-primary-solid);
  background: var(--dp-primary-bg);
}
.dp-generated--disabled {
  opacity: .55;
  pointer-events: none;
}
.dp-generated__header {
  display: flex;
  justify-content: space-between;
  gap: var(--dp-space-4);
}
.dp-generated__header p,
.dp-generated__content,
.dp-generated__muted,
.dp-generated__footer {
  margin: 0;
  color: var(--dp-muted-foreground);
  font-size: var(--dp-font-size-caption);
}
.dp-generated__actions,
.dp-generated__options,
.dp-generated__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dp-space-2);
}
.dp-generated__options button,
.dp-generated__list button {
  min-height: 28px;
  padding: 0 var(--dp-space-5);
  border-radius: var(--dp-radius-pill);
  background: var(--dp-muted);
  color: var(--dp-foreground-body);
  cursor: pointer;
}
.dp-generated__options button.active {
  background: var(--dp-primary-bg);
  color: var(--dp-foreground-emphasized);
}
.dp-generated__table {
  width: 100%;
  border-collapse: collapse;
}
.dp-generated__table th,
.dp-generated__table td {
  padding: var(--dp-space-3) var(--dp-space-4);
  border-bottom: 1px solid var(--dp-divider);
  text-align: left;
}
.dp-generated__table th {
  color: var(--dp-muted-foreground);
  font-weight: var(--dp-font-weight-medium);
}
</style>

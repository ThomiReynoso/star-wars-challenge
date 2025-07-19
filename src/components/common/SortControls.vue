<template>
  <div class="sort-controls">
    <span class="sort-label">Sort by:</span>
    
    <select
      :value="sortBy"
      @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value as 'name' | 'created')"
      class="input-field sort-select"
      aria-label="Sort field"
    >
      <option value="name">Name</option>
      <option value="created">Date Created</option>
    </select>
    
    <button
      @click="toggleSortOrder"
      class="btn btn-secondary sort-button"
      :aria-label="`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`"
    >
      <span class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
      <span>{{ sortOrder === 'asc' ? 'Asc' : 'Desc' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SortOrder, SortField } from '@/types'

interface Props {
  sortBy: SortField
  sortOrder: SortOrder
}

interface Emits {
  'update:sortBy': [field: SortField]
  'update:sortOrder': [order: SortOrder]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toggleSortOrder = () => {
  emit('update:sortOrder', props.sortOrder === 'asc' ? 'desc' : 'asc')
}
</script>

<style lang="scss" scoped>
.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-label {
  color: #D1D5DB;
  font-size: 0.875rem;
}

.sort-select {
  font-size: 0.875rem;
}

.sort-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.sort-icon {
  font-weight: bold;
}
</style>
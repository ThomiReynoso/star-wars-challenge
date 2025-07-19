<template>
  <div class="table-container">
    <table class="data-table">
      <thead class="table-header">
        <tr>
          <th class="table-th">Name</th>
          <th class="table-th">Height</th>
          <th class="table-th">Mass</th>
          <th class="table-th">Gender</th>
          <th class="table-th">Birth Year</th>
          <th class="table-th">Created</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          v-for="person in people"
          :key="person.url"
          class="table-row"
        >
          <td class="table-td">
            <div class="cell-primary">{{ person.name }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ person.height }}cm</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ person.mass }}kg</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary capitalize">{{ person.gender }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ person.birth_year }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ formatDate(person.created) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Person } from '@/types'
import { formatDate } from '@/utils'

interface Props {
  people: Person[]
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.table-container {
  overflow-x: auto;
}

.data-table {
  min-width: 100%;
  background-color: #1F2937;
  border-radius: 0.5rem;
  overflow: hidden;
}

.table-header {
  background-color: #374151;
}

.table-th {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #D1D5DB;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-body {
  tr:not(:last-child) {
    border-bottom: 1px solid #374151;
  }
}

.table-row {
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(55, 65, 81, 0.8);
  }
}

.table-td {
  padding: 1rem 1.5rem;
  white-space: nowrap;
}

.cell-primary {
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.cell-secondary {
  font-size: 0.875rem;
  color: #D1D5DB;
  
  &.capitalize {
    text-transform: capitalize;
  }
}
</style>
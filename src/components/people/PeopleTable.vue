<template>
  <div class="table-container" data-testid="people-table">
    <table class="data-table">
      <thead class="table-header">
        <tr>
          <th
            class="table-th sortable"
            @click="sort('name')"
            data-testid="sort-name"
          >
            <div class="th-content">
              <span>Name</span>
              <div class="sort-indicator">
                <span v-if="sortBy === 'name'" class="sort-icon">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
                <span v-else class="sort-icon inactive">↕</span>
              </div>
            </div>
          </th>
          <th class="table-th">Height</th>
          <th class="table-th">Mass</th>
          <th class="table-th">Gender</th>
          <th class="table-th">Birth Year</th>
          <th class="table-th sortable" @click="sort('created')">
            <div class="th-content">
              <span>Created</span>
              <div class="sort-indicator">
                <span v-if="sortBy === 'created'" class="sort-icon">
                  {{ sortOrder === 'asc' ? '↑' : '↓' }}
                </span>
                <span v-else class="sort-icon inactive">↕</span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          v-for="person in people"
          :key="person.url"
          class="table-row clickable-row"
          data-testid="people-row"
          @click="navigateToDetail(person)"
        >
          <td class="table-td">
            <div class="cell-primary" data-testid="person-name">
              {{ person.name }}
            </div>
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
import { useRouter } from 'vue-router'
import type { Person } from '@/types'
import { formatDate, extractIdFromUrl } from '@/utils'

interface Props {
  people: Person[]
  sortBy: 'name' | 'created'
  sortOrder: 'asc' | 'desc'
}

interface Emits {
  sort: [field: 'name' | 'created', order: 'asc' | 'desc']
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const sort = (field: 'name' | 'created') => {
  let newOrder: 'asc' | 'desc' = 'asc'

  if (props.sortBy === field) {
    newOrder = props.sortOrder === 'asc' ? 'desc' : 'asc'
  }

  emit('sort', field, newOrder)
}

const navigateToDetail = (person: Person) => {
  const id = extractIdFromUrl(person.url)
  if (id) {
    router.push(`/people/${id}`)
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  overflow-x: auto;
}

.data-table {
  min-width: 100%;
  background-color: #1f2937;
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
  color: #d1d5db;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &.sortable {
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}

.th-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.sort-indicator {
  display: flex;
  align-items: center;
  min-width: 1rem;
}

.sort-icon {
  font-size: 0.875rem;
  font-weight: bold;
  color: #0066cc;

  &.inactive {
    color: #6b7280;
    opacity: 0.5;
  }
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

  &.clickable-row {
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 102, 204, 0.1);
      transform: translateY(-1px);
    }
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
  color: #d1d5db;

  &.capitalize {
    text-transform: capitalize;
  }
}
</style>

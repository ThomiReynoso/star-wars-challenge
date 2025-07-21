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
@use '@/assets/styles/main.scss' as *;

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  background: rgba(30, 30, 40, 0.95);
  border: 1px solid rgba(70, 80, 100, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.data-table {
  min-width: 100%;
  background: transparent;
  border-collapse: collapse;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.table-header {
  background: rgba(50, 60, 80, 0.3);
  border-bottom: 1px solid rgba(100, 110, 130, 0.3);
}

.table-th {
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;

  &.sortable {
    cursor: pointer;
    user-select: none;
    transition: color 0.2s ease;

    &:hover {
      color: #4299e1;

      .sort-icon {
        color: #4299e1;
      }
    }
  }
}

.th-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.sort-indicator {
  display: flex;
  align-items: center;
  min-width: 1.2rem;
}

.sort-icon {
  font-size: 14px;
  font-weight: normal;
  color: #a0aec0;
  transition: color 0.2s ease;

  &.inactive {
    color: #718096;
    opacity: 0.7;
  }
}

.table-body {
  tr:not(:last-child) {
    border-bottom: 1px solid rgba(70, 80, 100, 0.2);
  }
}

.table-row {
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(100, 120, 150, 0.08);
  }

  &.clickable-row {
    cursor: pointer;

    &:hover {
      background: rgba(100, 120, 150, 0.12);

      .cell-primary {
        color: #4299e1;
      }
    }
  }
}

.table-td {
  padding: 12px 16px;
  white-space: nowrap;
  border: none;
}

.cell-primary {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  transition: color 0.2s ease;
}

.cell-secondary {
  font-size: 14px;
  color: #a0aec0;
  font-weight: 400;

  &.capitalize {
    text-transform: capitalize;
  }
}
</style>

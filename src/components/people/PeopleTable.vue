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
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.8),
    rgba(15, 15, 35, 0.7)
  );
  border: 1px solid rgba(35, 53, 84, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

.data-table {
  min-width: 100%;
  background: transparent;
  border-radius: 1rem;
  overflow: hidden;
  font-family: 'Orbitron', monospace;
}

.table-header {
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.08),
    rgba(100, 255, 218, 0.05)
  );
  border-bottom: 1px solid rgba(35, 53, 84, 0.8);
}

.table-th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  color: $text-accent;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;

  &.sortable {
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(100, 255, 218, 0.06);
      color: $primary-neon;

      .sort-icon {
        color: $primary-neon;
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
  font-size: 1rem;
  font-weight: bold;
  color: $text-accent;
  transition: all 0.3s ease;

  &.inactive {
    color: $text-dim;
    opacity: 0.6;
  }
}

.table-body {
  tr:not(:last-child) {
    border-bottom: 1px solid rgba(35, 53, 84, 0.5);
  }
}

.table-row {
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.05);
  }

  &.clickable-row {
    cursor: pointer;

    &:hover {
      background: rgba(0, 212, 255, 0.08);
      transform: translateY(-1px);

      .cell-primary {
        color: $primary-neon;
      }
    }
  }
}

.table-td {
  padding: 1.2rem 1.5rem;
  white-space: nowrap;
  border: none;
}

.cell-primary {
  font-size: 0.9rem;
  font-weight: 600;
  color: $text-bright;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.cell-secondary {
  font-size: 0.85rem;
  color: $text-glow;
  font-weight: 400;
  transition: all 0.3s ease;

  &.capitalize {
    text-transform: capitalize;
  }
}
</style>

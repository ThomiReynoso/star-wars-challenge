<template>
  <div class="table-container" data-testid="planets-table">
    <table class="data-table">
      <thead class="table-header">
        <tr>
          <th
            class="table-th sortable"
            @click="sort('name')"
            @keydown.enter="sort('name')"
            @keydown.space.prevent="sort('name')"
            tabindex="0"
            role="columnheader"
            :aria-sort="
              sortBy === 'name'
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            "
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
          <th class="table-th">Climate</th>
          <th class="table-th">Terrain</th>
          <th class="table-th">Population</th>
          <th class="table-th">Diameter</th>
          <th
            class="table-th sortable"
            @click="sort('created')"
            @keydown.enter="sort('created')"
            @keydown.space.prevent="sort('created')"
            tabindex="0"
            role="columnheader"
            :aria-sort="
              sortBy === 'created'
                ? sortOrder === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            "
          >
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
          v-for="planet in planets"
          :key="planet.url"
          class="table-row clickable-row"
          data-testid="planet-row"
          @click="navigateToDetail(planet)"
          @keydown.enter="navigateToDetail(planet)"
          @keydown.space.prevent="navigateToDetail(planet)"
          tabindex="0"
          role="button"
          :aria-label="`View details for ${planet.name}`"
        >
          <td class="table-td">
            <div class="cell-primary" data-testid="planet-name">
              {{ planet.name }}
            </div>
          </td>
          <td class="table-td">
            <div class="cell-secondary capitalize">{{ planet.climate }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary capitalize">{{ planet.terrain }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">
              {{ formatPopulation(planet.population) }}
            </div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ planet.diameter }}km</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ formatDate(planet.created) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Planet } from '@/types'
import { formatDate, extractIdFromUrl } from '@/utils'

interface Props {
  planets: Planet[]
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

const navigateToDetail = (planet: Planet) => {
  const id = extractIdFromUrl(planet.url)
  console.log('Planet ID:', id)
  console.log('Planet URL:', planet.url)
  console.log('Navigating to:', `/planets/${id}`)
  if (id) {
    router.push(`/planets/${id}`)
  }
}

const formatPopulation = (population: string): string => {
  if (population === 'unknown') return '-'

  const num = parseInt(population)
  if (isNaN(num)) return population

  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }

  return num.toLocaleString()
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
  width: 100%;
  background: transparent;
  border-collapse: collapse;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  table-layout: fixed;
}

.table-header {
  background: rgba(50, 60, 80, 0.3);
  border-bottom: 1px solid rgba(100, 110, 130, 0.3);
}

.table-th {
  padding: 12px 8px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #d1d5db;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;

  &:first-child {
    padding-left: 16px;
  }

  &:last-child {
    padding-right: 16px;
  }

  &.sortable {
    cursor: pointer;
    user-select: none;
    transition: color 0.2s ease;
    outline: none;

    &:hover,
    &:focus {
      color: #c084fc;
      background: rgba(192, 132, 252, 0.15);

      .sort-icon {
        color: #9f7aea;
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(192, 132, 252, 0.6);
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
  color: #d1d5db;
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
    background: rgba(120, 100, 150, 0.08);
  }

  &.clickable-row {
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus {
      background: rgba(120, 100, 150, 0.12);

      .cell-primary {
        color: #c084fc;
      }
    }

    &:focus {
      box-shadow: inset 0 0 0 2px rgba(192, 132, 252, 0.6);
    }
  }
}

.table-td {
  padding: 12px 8px;
  border: none;
  white-space: nowrap;

  &:first-child {
    padding-left: 16px;
  }

  &:last-child {
    padding-right: 16px;
  }
}

.cell-primary {
  font-size: 15px;
  font-weight: 600;
  color: #e2e8f0;
  transition: color 0.2s ease;
}

.cell-secondary {
  font-size: 14px;
  color: #d1d5db;
  font-weight: 400;

  &.capitalize {
    text-transform: capitalize;
  }
}
</style>

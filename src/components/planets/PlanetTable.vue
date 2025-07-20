<template>
  <div class="table-container" data-testid="planets-table">
    <table class="data-table">
      <thead class="table-header">
        <tr>
          <th class="table-th sortable" @click="sort('name')">
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
          v-for="planet in planets"
          :key="planet.url"
          class="table-row clickable-row"
          data-testid="planet-row"
          @click="navigateToDetail(planet)"
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

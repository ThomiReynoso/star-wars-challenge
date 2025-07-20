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
  width: 100%;
  background: transparent;
  border-radius: 1rem;
  overflow: hidden;
  font-family: 'Orbitron', monospace;
  table-layout: fixed;
}

.table-header {
  background: linear-gradient(
    135deg,
    rgba(157, 78, 221, 0.08),
    rgba(114, 9, 183, 0.05)
  );
  border-bottom: 1px solid rgba(35, 53, 84, 0.8);
}

.table-th {
  padding: 0.75rem 0.5rem;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  color: $secondary-neon;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;

  &:first-child {
    padding-left: 1rem;
  }

  &:last-child {
    padding-right: 1rem;
  }

  &.sortable {
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(157, 78, 221, 0.06);
      color: $accent-purple;

      .sort-icon {
        color: $accent-purple;
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
  color: $secondary-neon;
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
    background: rgba(157, 78, 221, 0.05);
  }

  &.clickable-row {
    cursor: pointer;

    &:hover {
      background: rgba(157, 78, 221, 0.08);
      transform: translateY(-1px);

      .cell-primary {
        color: $secondary-neon;
      }
    }
  }
}

.table-td {
  padding: 0.75rem 0.5rem;
  border: none;
  white-space: nowrap;

  &:first-child {
    padding-left: 1rem;
  }

  &:last-child {
    padding-right: 1rem;
  }
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

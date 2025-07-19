<template>
  <div class="table-container">
    <table class="data-table">
      <thead class="table-header">
        <tr>
          <th class="table-th">Name</th>
          <th class="table-th">Climate</th>
          <th class="table-th">Terrain</th>
          <th class="table-th">Population</th>
          <th class="table-th">Diameter</th>
          <th class="table-th">Created</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr
          v-for="planet in planets"
          :key="planet.url"
          class="table-row"
        >
          <td class="table-td">
            <div class="cell-primary">{{ planet.name }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary capitalize">{{ planet.climate }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary capitalize">{{ planet.terrain }}</div>
          </td>
          <td class="table-td">
            <div class="cell-secondary">{{ formatPopulation(planet.population) }}</div>
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
import type { Planet } from '@/types'
import { formatDate } from '@/utils'

interface Props {
  planets: Planet[]
}

defineProps<Props>()

const formatPopulation = (population: string): string => {
  if (population === 'unknown') return 'Unknown'
  
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
<template>
  <div class="planet-detail">
    <div class="detail-header">
      <button @click="goBack" class="back-button">
        ← Back to Planets
      </button>
      <h1 class="planet-name">{{ planet.name }}</h1>
    </div>
    
    <div class="detail-card">
      <div class="detail-grid">
        <div class="detail-section">
          <h2>Physical Properties</h2>
          <div class="detail-item">
            <span class="label">Diameter:</span>
            <span class="value">{{ formatDiameter(planet.diameter) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Rotation Period:</span>
            <span class="value">{{ formatPeriod(planet.rotation_period, 'hours') }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Orbital Period:</span>
            <span class="value">{{ formatPeriod(planet.orbital_period, 'days') }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Gravity:</span>
            <span class="value">{{ formatValue(planet.gravity) }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h2>Environmental Data</h2>
          <div class="detail-item">
            <span class="label">Climate:</span>
            <span class="value">{{ formatValue(planet.climate) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Terrain:</span>
            <span class="value">{{ formatValue(planet.terrain) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Surface Water:</span>
            <span class="value">{{ formatWater(planet.surface_water) }}</span>
          </div>
        </div>

        <div class="detail-section full-width">
          <h2>Population & Media</h2>
          <div class="detail-item">
            <span class="label">Population:</span>
            <span class="value">{{ formatPopulation(planet.population) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Residents:</span>
            <span class="value">{{ planet.residents.length }} resident(s)</span>
          </div>
          <div class="detail-item">
            <span class="label">Films:</span>
            <span class="value">{{ planet.films.length }} film(s)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Planet } from '@/types'

interface Props {
  planet: Planet
}

defineProps<Props>()

const router = useRouter()

const goBack = () => {
  router.push('/planets')
}

const formatValue = (value: string) => {
  if (!value || value === 'unknown' || value === 'n/a') {
    return 'N/A'
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const formatDiameter = (diameter: string) => {
  if (!diameter || diameter === 'unknown') return 'N/A'
  return `${Number(diameter).toLocaleString()} km`
}

const formatPeriod = (period: string, unit: string) => {
  if (!period || period === 'unknown') return 'Unknown'
  return `${period} ${unit}`
}

const formatWater = (water: string) => {
  if (!water || water === 'unknown') return 'Unknown'
  return `${water}%`
}

const formatPopulation = (population: string) => {
  if (!population || population === 'unknown') return 'Unknown'
  const num = Number(population)
  if (isNaN(num)) return formatValue(population)
  return num.toLocaleString()
}
</script>

<style scoped lang="scss">
.planet-detail {
  color: #f3f4f6;
}

.detail-header {
  margin-bottom: 2rem;
}

.back-button {
  background: #374151;
  border: none;
  color: #0066cc;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  margin-bottom: 1rem;

  &:hover {
    background: #4b5563;
    transform: translateX(-2px);
  }
}

.planet-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(135deg, #0066cc, #0080ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.detail-card {
  background: #374151;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.detail-section {
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #0066cc;
    border-bottom: 2px solid #4b5563;
    padding-bottom: 0.5rem;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #4b5563;

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 500;
    color: #d1d5db;
  }

  .value {
    font-weight: 600;
    color: #f3f4f6;
  }
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .planet-name {
    font-size: 2rem;
  }

  .detail-card {
    padding: 1.5rem;
  }
}
</style>
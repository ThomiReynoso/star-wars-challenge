<template>
  <div class="planet-detail">
    <div class="detail-header">
      <button @click="goBack" class="back-button">← Back to Planets</button>
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
            <span class="value">{{
              formatPeriod(planet.rotation_period, 'hours')
            }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Orbital Period:</span>
            <span class="value">{{
              formatPeriod(planet.orbital_period, 'days')
            }}</span>
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
@use '@/assets/styles/main.scss' as *;

.planet-detail {
  color: #e2e8f0;
  min-height: 100vh;
  position: relative;
}

.detail-header {
  margin-bottom: 2rem;
  text-align: center;
}

.back-button {
  background: rgba(159, 122, 234, 0.1);
  border: 1px solid #9f7aea;
  color: #9f7aea;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: rgba(159, 122, 234, 0.2);
    border-color: #b794f6;
  }
}

.planet-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #e2e8f0;
  letter-spacing: 1px;
}

.detail-card {
  background: rgba(30, 30, 40, 0.95);
  border: 1px solid rgba(70, 80, 100, 0.4);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: 1000px;
  margin: 0 auto;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-section {
  background: rgba(50, 60, 80, 0.2);
  border: 1px solid rgba(100, 110, 130, 0.3);
  border-radius: 8px;
  padding: 20px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(100, 110, 130, 0.5);
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #9f7aea;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(100, 110, 130, 0.3);
    padding-bottom: 8px;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(70, 80, 100, 0.2);

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 500;
    color: #a0aec0;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .value {
    font-weight: 600;
    color: #e2e8f0;
    font-size: 15px;
    text-align: right;
    max-width: 60%;
  }
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .planet-name {
    font-size: 2rem;
  }

  .detail-card {
    margin: 0 1rem;
    padding: 16px;
  }

  .detail-section {
    padding: 16px;
  }
}
</style>

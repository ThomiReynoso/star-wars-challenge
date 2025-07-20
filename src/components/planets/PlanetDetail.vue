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
  color: $text-bright;
  min-height: 100vh;
  position: relative;
}

.detail-header {
  margin-bottom: 3rem;
  text-align: center;
}

.back-button {
  @include neon-button;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  border-color: $secondary-neon;
  color: $secondary-neon;
  background: linear-gradient(
    135deg,
    rgba(157, 78, 221, 0.1),
    rgba(114, 9, 183, 0.1)
  );

  &:hover {
    transform: translateX(-3px) translateY(-2px);
    box-shadow: $purple-shadow;
  }
}

.planet-name {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Orbitron', monospace;
  letter-spacing: 3px;
  background: linear-gradient(135deg, $secondary-neon, $accent-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(157, 78, 221, 0.5);
  animation: pulse-neon 4s infinite;
}

.detail-card {
  @include holographic-card;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  border-color: rgba(157, 78, 221, 0.3);
  box-shadow: $purple-shadow;

  &:hover {
    transform: translateY(-2px) scale(1.01);
    border-color: $secondary-neon;
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.detail-section {
  background: linear-gradient(
    135deg,
    rgba(157, 78, 221, 0.03),
    rgba(255, 0, 110, 0.02)
  );
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: $secondary-neon;
    background: linear-gradient(
      135deg,
      rgba(157, 78, 221, 0.06),
      rgba(255, 0, 110, 0.03)
    );
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: $secondary-neon;
    font-family: 'Orbitron', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid rgba(157, 78, 221, 0.4);
    padding-bottom: 0.75rem;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 30%;
      height: 2px;
      background: linear-gradient(90deg, $secondary-neon, transparent);
    }
  }

  &.full-width {
    grid-column: 1 / -1;
  }
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(157, 78, 221, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(157, 78, 221, 0.02);
    padding-left: 0.5rem;
    border-bottom-color: $secondary-neon;
  }

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-weight: 500;
    color: $text-glow;
    font-family: 'Orbitron', monospace;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .value {
    font-weight: 600;
    color: $text-bright;
    font-size: 1rem;
    text-align: right;
    max-width: 60%;
  }
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .planet-name {
    font-size: 2.2rem;
    letter-spacing: 2px;
  }

  .detail-card {
    margin: 0 1rem;
    padding: 1.5rem;
  }

  .detail-section {
    padding: 1.25rem;
  }
}
</style>

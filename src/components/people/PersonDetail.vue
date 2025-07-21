<template>
  <div class="person-detail">
    <div class="detail-header">
      <button @click="goBack" class="back-button">← Back to Characters</button>
      <h1 class="person-name">{{ person.name }}</h1>
    </div>

    <div class="detail-card">
      <div class="detail-grid">
        <div class="detail-section">
          <h2>Physical Attributes</h2>
          <div class="detail-item">
            <span class="label">Height:</span>
            <span class="value">{{ formatHeight(person.height) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Mass:</span>
            <span class="value">{{ formatMass(person.mass) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Hair Color:</span>
            <span class="value">{{ formatValue(person.hair_color) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Skin Color:</span>
            <span class="value">{{ formatValue(person.skin_color) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Eye Color:</span>
            <span class="value">{{ formatValue(person.eye_color) }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h2>Personal Information</h2>
          <div class="detail-item">
            <span class="label">Birth Year:</span>
            <span class="value">{{ formatValue(person.birth_year) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Gender:</span>
            <span class="value">{{ formatValue(person.gender) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Homeworld:</span>
            <span class="value">{{ formatValue(person.homeworld) }}</span>
          </div>
        </div>

        <div class="detail-section full-width">
          <h2>Associations</h2>
          <div class="detail-item">
            <span class="label">Films:</span>
            <span class="value">{{ person.films.length }} film(s)</span>
          </div>
          <div class="detail-item">
            <span class="label">Species:</span>
            <span class="value">{{ person.species.length || 'Human' }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Vehicles:</span>
            <span class="value">{{ person.vehicles.length }} vehicle(s)</span>
          </div>
          <div class="detail-item">
            <span class="label">Starships:</span>
            <span class="value">{{ person.starships.length }} starship(s)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Person } from '@/types'

interface Props {
  person: Person
}

defineProps<Props>()

const router = useRouter()

const goBack = () => {
  router.push('/people')
}

const formatValue = (value: string) => {
  if (!value || value === 'unknown' || value === 'n/a') {
    return 'Unknown'
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const formatHeight = (height: string) => {
  if (!height || height === 'unknown') return 'Unknown'
  return `${height} cm`
}

const formatMass = (mass: string) => {
  if (!mass || mass === 'unknown') return 'Unknown'
  return `${mass} kg`
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/main.scss' as *;

.person-detail {
  color: #e2e8f0;
  min-height: 100vh;
  position: relative;
}

.detail-header {
  margin-bottom: 2rem;
  text-align: center;
}

.back-button {
  background: rgba(66, 153, 225, 0.1);
  border: 1px solid #4299e1;
  color: #4299e1;
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
    background: rgba(66, 153, 225, 0.2);
    border-color: #63b3ed;
  }
}

.person-name {
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
    color: #4299e1;
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

  .person-name {
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

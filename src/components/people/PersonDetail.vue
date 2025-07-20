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
.person-detail {
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

.person-name {
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

  .person-name {
    font-size: 2rem;
  }

  .detail-card {
    padding: 1.5rem;
  }
}
</style>

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

  &:hover {
    transform: translateX(-3px) translateY(-2px);
  }
}

.person-name {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  font-family: 'Orbitron', monospace;
  letter-spacing: 3px;
  background: linear-gradient(135deg, $primary-neon, $text-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
  animation: pulse-neon 4s infinite;
}

.detail-card {
  @include holographic-card;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px) scale(1.01);
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
    rgba(0, 212, 255, 0.03),
    rgba(100, 255, 218, 0.02)
  );
  border: 1px solid rgba(35, 53, 84, 0.5);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: $border-glow;
    background: linear-gradient(
      135deg,
      rgba(0, 212, 255, 0.06),
      rgba(100, 255, 218, 0.03)
    );
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: $text-accent;
    font-family: 'Orbitron', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid $border-glow;
    padding-bottom: 0.75rem;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 30%;
      height: 2px;
      background: linear-gradient(90deg, $primary-neon, transparent);
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
  border-bottom: 1px solid rgba(35, 53, 84, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.02);
    padding-left: 0.5rem;
    border-bottom-color: $border-glow;
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

  .person-name {
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

<template>
  <div class="loading-container">
    <div class="cyber-spinner">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-core"></div>
    </div>
    <span v-if="message" class="loading-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
}

.cyber-spinner {
  position: relative;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-ring {
  position: absolute;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: spin 2s linear infinite;

  &:nth-child(1) {
    width: 4rem;
    height: 4rem;
    border-top: 2px solid $primary-neon;
    border-right: 2px solid $primary-neon;
    animation-duration: 1.5s;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }

  &:nth-child(2) {
    width: 3rem;
    height: 3rem;
    border-left: 2px solid $text-accent;
    border-bottom: 2px solid $text-accent;
    animation-duration: 1.2s;
    animation-direction: reverse;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  }

  &:nth-child(3) {
    width: 2rem;
    height: 2rem;
    border-top: 2px solid $secondary-neon;
    border-left: 2px solid $secondary-neon;
    animation-duration: 0.8s;
    box-shadow: 0 0 10px rgba(157, 78, 221, 0.3);
  }
}

.spinner-core {
  width: 0.5rem;
  height: 0.5rem;
  background: radial-gradient(circle, $accent-cyan, $primary-neon);
  border-radius: 50%;
  box-shadow: 0 0 10px $primary-neon;
  animation: pulse-core 1s ease-in-out infinite alternate;
}

.loading-message {
  color: $text-glow;
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  animation: pulse-neon 2s infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-core {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0.7;
  }
}
</style>

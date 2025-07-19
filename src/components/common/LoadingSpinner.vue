<template>
  <div class="loading-container">
    <div class="spinner"></div>
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
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 2px solid transparent;
  border-bottom: 2px solid #0066CC;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-message {
  margin-left: 0.75rem;
  color: #D1D5DB;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
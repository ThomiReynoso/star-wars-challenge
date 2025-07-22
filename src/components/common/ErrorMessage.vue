<template>
  <div class="error-message" role="alert">
    <strong class="font-bold">Error:</strong>
    <span class="error-text">{{ message }}</span>
    <button
      v-if="showRetry"
      @click="$emit('retry')"
      class="btn btn-secondary mt-4"
    >
      Retry
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
  showRetry?: boolean
}

interface Emits {
  retry: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.error-message {
  background-color: #7f1d1d;
  border: 1px solid #dc2626;
  color: #fca5a5;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.error-text {
  display: block;
  margin-left: 0.5rem;

  @media (min-width: 640px) {
    display: inline;
  }
}

.mt-4 {
  margin-top: 1rem;
}
</style>

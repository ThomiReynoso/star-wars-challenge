<template>
  <div class="search-container">
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      type="text"
      :placeholder="placeholder"
      class="input-field search-input"
      :aria-label="placeholder"
    />
    <div class="search-icon">
      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
}

interface Emits {
  'update:modelValue': [value: string]
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding-left: 2.75rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.search-icon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding-left: 0.875rem;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.icon {
  height: 1.375rem;
  width: 1.375rem;
  color: #9ca3af;
}
</style>

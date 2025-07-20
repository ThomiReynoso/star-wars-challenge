<template>
  <div class="search-container">
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      type="text"
      :placeholder="placeholder"
      class="cyber-input search-input"
      :aria-label="placeholder"
      data-testid="search-input"
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
@use '@/assets/styles/main.scss' as *;

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding-left: 3rem;
  padding-right: 1.25rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1rem;
  border-radius: 0.75rem;
  position: relative;
  transition: all 0.3s ease;

  &::placeholder {
    color: $text-dim;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }

  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 212, 255, 0.2);

    + .search-icon .icon {
      color: $primary-neon;
      filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
      animation: pulse-neon 2s infinite;
    }
  }
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 1;
}

.icon {
  height: 1.5rem;
  width: 1.5rem;
  color: $text-accent;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 5px rgba(100, 255, 218, 0.3));
}
</style>

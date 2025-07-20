<template>
  <div class="pagination" v-if="totalPages > 1" data-testid="pagination">
    <div class="pagination-info">
      <span class="pagination-text">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }}
        {{ itemType }}
      </span>
    </div>

    <div class="pagination-controls">
      <!-- Previous Button -->
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-btn"
        :class="{ disabled: currentPage === 1 }"
        aria-label="Go to previous page"
        data-testid="prev-page"
      >
        <svg
          class="pagination-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Previous
      </button>

      <!-- Page Numbers -->
      <div class="page-numbers">
        <!-- Start pages (1, 2, 3) -->
        <button
          v-for="page in paginationConfig.startPages"
          :key="`start-${page}`"
          @click="goToPage(page)"
          class="page-btn"
          :class="{ active: currentPage === page }"
          :data-testid="currentPage === page ? 'current-page' : 'page-btn'"
        >
          {{ page }}
        </button>

        <!-- Start ellipsis -->
        <span v-if="paginationConfig.showStartEllipsis" class="ellipsis"
          >...</span
        >

        <!-- Middle pages (around current page) -->
        <button
          v-for="page in paginationConfig.middlePages"
          :key="`middle-${page}`"
          @click="goToPage(page)"
          class="page-btn"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>

        <!-- End ellipsis -->
        <span v-if="paginationConfig.showEndEllipsis" class="ellipsis"
          >...</span
        >

        <!-- End pages (last 2 pages) -->
        <button
          v-for="page in paginationConfig.endPages"
          :key="`end-${page}`"
          @click="goToPage(page)"
          class="page-btn"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
        :class="{ disabled: currentPage === totalPages }"
        aria-label="Go to next page"
        data-testid="next-page"
      >
        Next
        <svg
          class="pagination-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  itemType?: string
}

interface Emits {
  'page-change': [page: number]
}

const props = withDefaults(defineProps<Props>(), {
  itemType: 'items',
})

const emit = defineEmits<Emits>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const paginationConfig = computed(() => {
  const totalPages = props.totalPages
  const currentPage = props.currentPage

  // If 7 or fewer pages, show all
  if (totalPages <= 7) {
    return {
      startPages: Array.from({ length: totalPages }, (_, i) => i + 1),
      showStartEllipsis: false,
      middlePages: [],
      showEndEllipsis: false,
      endPages: [],
    }
  }

  let startPages: number[] = []
  let middlePages: number[] = []
  let endPages: number[] = []
  let showStartEllipsis = false
  let showEndEllipsis = false

  if (currentPage <= 4) {
    // Current page is near the start: show 1,2,3,4,5,6 ... last
    startPages = [1, 2, 3, 4, 5, 6]
    showEndEllipsis = true
    endPages = [totalPages]
  } else if (currentPage >= totalPages - 2) {
    // Current page is near the end: show 1,2,3,4 ... last-2,last-1,last
    startPages = [1, 2, 3, 4]
    showStartEllipsis = true
    endPages = [totalPages - 2, totalPages - 1, totalPages]
  } else {
    // Current page is in the middle: show 1,2,3,4 ... current-1,current,current+1 ... last
    startPages = [1, 2, 3, 4]
    showStartEllipsis = true
    middlePages = [currentPage - 1, currentPage, currentPage + 1]
    showEndEllipsis = true
    endPages = [totalPages]
  }

  return {
    startPages,
    showStartEllipsis,
    middlePages,
    showEndEllipsis,
    endPages,
  }
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss' as *;

.pagination {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.9),
    rgba(15, 15, 35, 0.8)
  );
  border: 1px solid $border-glow;
  border-radius: 1rem;
  backdrop-filter: blur(10px);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.pagination-info {
  .pagination-text {
    font-size: 0.9rem;
    color: $text-glow;
    font-family: 'Orbitron', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pagination-btn {
  @include neon-button;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding: 0.75rem 1.25rem;

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    border-color: $text-dim;
    color: $text-dim;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

.pagination-icon {
  height: 1rem;
  width: 1rem;
  transition: all 0.3s ease;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 46, 0.8),
    rgba(15, 15, 35, 0.6)
  );
  color: $text-glow;
  border: 1px solid $border-glow;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    border-color: $primary-neon;
    color: $primary-neon;
    text-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
    transform: translateY(-2px);

    &:before {
      left: 100%;
    }
  }

  &.active {
    background: linear-gradient(
      135deg,
      rgba(0, 212, 255, 0.2),
      rgba(100, 255, 218, 0.1)
    );
    border-color: $text-accent;
    color: $text-accent;
    text-shadow: 0 0 10px rgba(100, 255, 218, 0.6);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
    transform: scale(1.1);
  }
}

.ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  color: $text-accent;
  font-weight: 600;
  font-family: 'Orbitron', monospace;
  text-shadow: 0 0 5px rgba(100, 255, 218, 0.3);
  animation: pulse-neon 3s infinite;
}
</style>

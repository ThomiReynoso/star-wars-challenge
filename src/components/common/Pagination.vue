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
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 16px;
  background: rgba(30, 30, 40, 0.95);
  border: 1px solid rgba(70, 80, 100, 0.4);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.pagination-info {
  .pagination-text {
    font-size: 14px;
    color: #a0aec0;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  padding: 8px 12px;
  background: rgba(66, 153, 225, 0.1);
  border: 1px solid #4299e1;
  color: #4299e1;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #718096;
    color: #718096;
    background: rgba(113, 128, 150, 0.1);

    &:hover {
      background: rgba(113, 128, 150, 0.1);
    }
  }

  &:hover:not(.disabled) {
    background: rgba(66, 153, 225, 0.2);
    border-color: #63b3ed;
  }
}

.pagination-icon {
  height: 16px;
  width: 16px;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(70, 80, 100, 0.2);
  color: #a0aec0;
  border: 1px solid rgba(100, 110, 130, 0.3);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  &:hover {
    border-color: #4299e1;
    color: #4299e1;
    background: rgba(66, 153, 225, 0.1);
  }

  &.active {
    background: rgba(66, 153, 225, 0.2);
    border-color: #4299e1;
    color: #4299e1;
    font-weight: 600;
  }
}

.ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #a0aec0;
  font-weight: 500;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>

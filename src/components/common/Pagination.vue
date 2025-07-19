<template>
  <div class="pagination" v-if="totalPages > 1">
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
.pagination {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.pagination-info {
  .pagination-text {
    font-size: 0.875rem;
    color: #9ca3af;
  }
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4b5563;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(.disabled) {
    background-color: #374151;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination-icon {
  height: 1rem;
  width: 1rem;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #4b5563;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #374151;
  }

  &.active {
    background-color: #0066cc;
    color: white;
  }
}

.ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: #9ca3af;
  font-weight: 500;
}
</style>

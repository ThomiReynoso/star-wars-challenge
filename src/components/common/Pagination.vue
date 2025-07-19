<template>
  <div class="pagination" v-if="totalPages > 1">
    <div class="pagination-info">
      <span class="pagination-text">
        Showing {{ startItem }} to {{ endItem }} of {{ totalItems }} {{ itemType }}
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
        <svg class="pagination-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Previous
      </button>

      <!-- Page Numbers -->
      <div class="page-numbers">
        <!-- First page -->
        <button
          v-if="showFirstPage"
          @click="goToPage(1)"
          class="page-btn"
          :class="{ active: currentPage === 1 }"
        >
          1
        </button>
        
        <!-- First ellipsis -->
        <span v-if="showFirstEllipsis" class="ellipsis">...</span>
        
        <!-- Visible page range -->
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="page-btn"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
        
        <!-- Last ellipsis -->
        <span v-if="showLastEllipsis" class="ellipsis">...</span>
        
        <!-- Last page -->
        <button
          v-if="showLastPage"
          @click="goToPage(totalPages)"
          class="page-btn"
          :class="{ active: currentPage === totalPages }"
        >
          {{ totalPages }}
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
        <svg class="pagination-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
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
  itemType: 'items'
})

const emit = defineEmits<Emits>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const visiblePages = computed(() => {
  const delta = 2 // Number of pages to show around current page
  const range: number[] = []
  const rangeWithDots: number[] = []

  for (let i = Math.max(2, props.currentPage - delta); 
       i <= Math.min(props.totalPages - 1, props.currentPage + delta); 
       i++) {
    range.push(i)
  }

  if (props.currentPage - delta > 2) {
    rangeWithDots.push(2)
  } else {
    for (let i = 2; i < Math.max(2, props.currentPage - delta); i++) {
      rangeWithDots.push(i)
    }
  }

  rangeWithDots.push(...range)

  if (props.currentPage + delta < props.totalPages - 1) {
    rangeWithDots.push(props.totalPages - 1)
  } else {
    for (let i = Math.min(props.totalPages - 1, props.currentPage + delta) + 1; 
         i < props.totalPages; 
         i++) {
      rangeWithDots.push(i)
    }
  }

  return rangeWithDots
})

const showFirstPage = computed(() => {
  return !visiblePages.value.includes(1) && props.totalPages > 1
})

const showLastPage = computed(() => {
  return !visiblePages.value.includes(props.totalPages) && props.totalPages > 1
})

const showFirstEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

const showLastEllipsis = computed(() => {
  return visiblePages.value.length > 0 && 
         visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
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
    color: #9CA3AF;
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
  background-color: #4B5563;
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
  background-color: #4B5563;
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
    background-color: #0066CC;
    color: white;
  }
}

.ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: #9CA3AF;
  font-weight: 500;
}
</style>
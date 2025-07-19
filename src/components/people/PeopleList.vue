<template>
  <div class="people-list">
    <!-- Header with Search and Sort -->
    <div class="list-header">
      <h2 class="list-title">Star Wars Characters</h2>
      
      <div class="list-controls">
        <SearchInput
          v-model="searchQuery"
          placeholder="Search characters..."
          class="search-input"
        />
        
        <SortControls
          :sort-by="search.sortBy"
          :sort-order="search.sortOrder"
          @update:sort-by="sortPeople($event, search.sortOrder)"
          @update:sort-order="sortPeople(search.sortBy, $event)"
        />
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading.isLoading" message="Loading characters..." />

    <!-- Error State -->
    <ErrorMessage
      v-else-if="loading.error"
      :message="loading.error"
      show-retry
      @retry="fetchPeople(1)"
    />

    <!-- Content -->
    <div v-else-if="people.length > 0">
      <!-- Table View -->
      <PeopleTable :people="people" />

      <!-- Pagination Info -->
      <div class="pagination-info">
        <span class="pagination-text">
          Showing {{ ((pagination.currentPage - 1) * pagination.itemsPerPage) + 1 }} to 
          {{ Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems) }} 
          of {{ pagination.totalItems }} characters
        </span>
        
        <div class="pagination-page">
          <span>Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <p class="empty-message">No characters found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { usePeople } from '@/composables/usePeople'
import PeopleTable from './PeopleTable.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import SortControls from '@/components/common/SortControls.vue'

const searchQuery = ref('')

const {
  people,
  loading,
  pagination,
  search,
  fetchPeople,
  searchPeople,
  sortPeople,
} = usePeople()

watch(searchQuery, (newQuery) => {
  searchPeople(newQuery)
})

onMounted(() => {
  fetchPeople()
})
</script>

<style lang="scss" scoped>
.people-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.list-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
}

.list-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.list-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  @media (min-width: 640px) {
    flex-direction: row;
    width: auto;
    gap: 1rem;
  }
}

.search-input {
  width: 100%;
  
  @media (min-width: 640px) {
    width: 16rem;
  }
}

.pagination-info {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #9CA3AF;
}

.pagination-page {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-message {
  color: #9CA3AF;
}
</style>
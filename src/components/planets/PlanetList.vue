<template>
  <div class="planets-list">
    <!-- Header with Search and Sort -->
    <div class="list-header">
      <h2 class="list-title">Star Wars Planets</h2>
      
      <div class="list-controls">
        <SearchInput
          v-model="searchQuery"
          placeholder="Search planets..."
          class="search-input"
        />
        
        <SortControls
          :sort-by="search.sortBy"
          :sort-order="search.sortOrder"
          @update:sort-by="sortPlanets($event, search.sortOrder)"
          @update:sort-order="sortPlanets(search.sortBy, $event)"
        />
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="loading.isLoading" message="Loading planets..." />

    <!-- Error State -->
    <ErrorMessage
      v-else-if="loading.error"
      :message="loading.error"
      show-retry
      @retry="fetchPlanets()"
    />

    <!-- Content -->
    <div v-else-if="planets.length > 0">
      <!-- Table View -->
      <PlanetTable :planets="planets" />

      <!-- Pagination -->
      <Pagination
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :total-items="pagination.totalItems"
        :items-per-page="pagination.itemsPerPage"
        item-type="planets"
        @page-change="goToPage"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <p class="empty-message">No planets found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { usePlanets } from '@/composables/usePlanets'
import PlanetTable from './PlanetTable.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import SortControls from '@/components/common/SortControls.vue'
import Pagination from '@/components/common/Pagination.vue'

const searchQuery = ref('')

const {
  planets,
  loading,
  pagination,
  search,
  fetchPlanets,
  searchPlanets,
  sortPlanets,
  goToPage,
} = usePlanets()

watch(searchQuery, (newQuery) => {
  searchPlanets(newQuery)
})

onMounted(() => {
  fetchPlanets()
})
</script>

<style lang="scss" scoped>
.planets-list {
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


.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-message {
  color: #9CA3AF;
}
</style>
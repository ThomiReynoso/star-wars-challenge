<template>
  <div class="planets-list">
    <!-- Header -->
    <div class="list-header">
      <h2 class="list-title">Star Wars Planets</h2>
      <p class="list-subtitle">Discover worlds across the galaxy with unique climates and terrains</p>
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
      <!-- Search Bar -->
      <div class="search-section">
        <SearchInput
          v-model="searchQuery"
          placeholder="Search planets..."
          class="search-input"
        />
      </div>

      <!-- Table View -->
      <PlanetTable 
        :planets="planets"
        :sort-by="search.sortBy"
        :sort-order="search.sortOrder"
        @sort="handleSort"
      />

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

const handleSort = (field: 'name' | 'created', order: 'asc' | 'desc') => {
  sortPlanets(field, order)
}

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
  text-align: center;
  margin-bottom: 2rem;
}

.list-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.list-subtitle {
  font-size: 1rem;
  color: #9CA3AF;
  margin: 0;
}

.search-section {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
}


.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-message {
  color: #9CA3AF;
}
</style>
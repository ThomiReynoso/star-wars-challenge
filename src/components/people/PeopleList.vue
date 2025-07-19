<template>
  <div class="people-list">
    <!-- Header -->
    <div class="list-header">
      <h2 class="list-title">Star Wars Characters</h2>
      <p class="list-subtitle">
        Explore the heroes and villains from a galaxy far, far away
      </p>
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
    <div v-else>
      <!-- Search Bar -->
      <div class="search-section">
        <SearchInput
          v-model="searchQuery"
          placeholder="Search characters..."
          class="search-input"
        />
      </div>

      <!-- Table and Pagination (when there are results) -->
      <div v-if="people.length > 0">
        <!-- Table View -->
        <PeopleTable
          :people="people"
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
          item-type="characters"
          @page-change="goToPage"
        />
      </div>

      <!-- Empty State with Search -->
      <div v-else-if="searchQuery.trim()" class="search-empty-state">
        <div class="empty-icon">
          <svg
            class="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <h3 class="empty-title">No characters found</h3>
        <p class="empty-subtitle">Try adjusting your search terms</p>
        <button @click="clearSearch" class="clear-search-btn">
          Clear search
        </button>
      </div>

      <!-- Default Empty State -->
      <div v-else class="empty-state">
        <p class="empty-message">No characters found.</p>
      </div>
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
import Pagination from '@/components/common/Pagination.vue'

const searchQuery = ref('')

const {
  people,
  loading,
  pagination,
  search,
  fetchPeople,
  searchPeople,
  sortPeople,
  goToPage,
} = usePeople()

const handleSort = (field: 'name' | 'created', order: 'asc' | 'desc') => {
  sortPeople(field, order)
}

const clearSearch = () => {
  searchQuery.value = ''
}

watch(searchQuery, newQuery => {
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
  color: #9ca3af;
  margin: 0;
}

.search-section {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
}

.search-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  margin-bottom: 1.5rem;

  .icon {
    height: 4rem;
    width: 4rem;
    color: #6b7280;
    stroke-width: 1;
  }
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
}

.empty-subtitle {
  font-size: 1rem;
  color: #9ca3af;
  margin: 0 0 2rem 0;
}

.clear-search-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-message {
  color: #9ca3af;
}
</style>

import { ref, computed } from 'vue'
import type {
  Person,
  LoadingState,
  PaginationState,
  SearchState,
} from '@/types'
import { apiService } from '@/services/api'
import { debounce, sortBy, filterByName } from '@/utils'
import { PAGINATION } from '@/constants/api'

export function usePeople() {
  const allPeople = ref<Person[]>([])

  const loading = ref<LoadingState>({
    isLoading: false,
    error: null,
  })

  const pagination = ref<PaginationState>({
    currentPage: PAGINATION.DEFAULT_PAGE,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: PAGINATION.ITEMS_PER_PAGE,
  })

  const search = ref<SearchState>({
    query: '',
    sortBy: 'name',
    sortOrder: 'asc',
  })

  const filteredAndSortedPeople = computed(() => {
    if (!allPeople.value || allPeople.value.length === 0) return []

    let result = filterByName(allPeople.value, search.value.query)
    result = sortBy(result, search.value.sortBy, search.value.sortOrder)
    return result
  })

  const paginatedPeople = computed(() => {
    if (
      !filteredAndSortedPeople.value ||
      filteredAndSortedPeople.value.length === 0
    )
      return []

    const start =
      (pagination.value.currentPage - 1) * pagination.value.itemsPerPage
    const end = start + pagination.value.itemsPerPage
    return filteredAndSortedPeople.value.slice(start, end)
  })

  const updatePagination = () => {
    const totalFilteredItems = filteredAndSortedPeople.value.length
    pagination.value.totalItems = totalFilteredItems
    pagination.value.totalPages = Math.ceil(
      totalFilteredItems / pagination.value.itemsPerPage
    )
  }

  const fetchPeople = async (page: number = 1, searchQuery?: string) => {
    // If we already have data and we're just changing pages, don't refetch
    if (allPeople.value.length > 0 && !searchQuery && page !== 1) {
      pagination.value.currentPage = page
      return
    }

    loading.value.isLoading = true
    loading.value.error = null

    try {
      // Fetch all data from API (it returns everything at once)
      const response = await apiService.getPeople(1, '')

      if (!response || !Array.isArray(response.results)) {
        throw new Error('Invalid response from API')
      }

      // Store all data
      allPeople.value = response.results || []

      // Update pagination info
      updatePagination()
      pagination.value.currentPage = page
    } catch (error) {
      loading.value.error =
        error instanceof Error ? error.message : 'Failed to fetch people'
      console.error('Error fetching people:', error)
    } finally {
      loading.value.isLoading = false
    }
  }

  const searchPeople = debounce((query: string) => {
    search.value.query = query
    pagination.value.currentPage = 1

    // Update pagination info based on filtered data
    updatePagination()
  }, 300)

  const sortPeople = (field: 'name' | 'created', order: 'asc' | 'desc') => {
    search.value.sortBy = field
    search.value.sortOrder = order
    updatePagination()
  }

  const loadMore = async () => {
    if (pagination.value.currentPage < pagination.value.totalPages) {
      await fetchPeople(pagination.value.currentPage + 1, search.value.query)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.currentPage = page
    }
  }

  return {
    people: paginatedPeople,
    allPeople,
    loading,
    pagination,
    search,
    fetchPeople,
    searchPeople,
    sortPeople,
    loadMore,
    goToPage,
  }
}

import { ref, computed } from 'vue'
import { apiService } from '@/services/api'
import type { Person, LoadingState } from '@/types'

export function usePersonDetail() {
  const person = ref<Person | null>(null)
  const loadingState = ref<LoadingState>({
    isLoading: false,
    error: null,
  })

  const isLoading = computed(() => loadingState.value.isLoading)
  const error = computed(() => loadingState.value.error)

  const fetchPerson = async (id: string) => {
    loadingState.value = { isLoading: true, error: null }
    person.value = null

    try {
      const data = await apiService.getPersonById(id)
      person.value = data
    } catch (err) {
      loadingState.value.error =
        err instanceof Error ? err.message : 'Failed to fetch person details'
    } finally {
      loadingState.value.isLoading = false
    }
  }

  return {
    person: computed(() => person.value),
    isLoading,
    error,
    fetchPerson,
  }
}

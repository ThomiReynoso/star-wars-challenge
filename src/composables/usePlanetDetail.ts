import { ref, computed } from 'vue'
import { apiService } from '@/services/api'
import type { Planet, LoadingState } from '@/types'

export function usePlanetDetail() {
  const planet = ref<Planet | null>(null)
  const loadingState = ref<LoadingState>({
    isLoading: false,
    error: null,
  })

  const isLoading = computed(() => loadingState.value.isLoading)
  const error = computed(() => loadingState.value.error)

  const fetchPlanet = async (id: string) => {
    loadingState.value = { isLoading: true, error: null }
    planet.value = null

    try {
      const data = await apiService.getPlanetById(id)
      planet.value = data
    } catch (err) {
      loadingState.value.error =
        err instanceof Error ? err.message : 'Failed to fetch planet details'
    } finally {
      loadingState.value.isLoading = false
    }
  }

  return {
    planet: computed(() => planet.value),
    isLoading,
    error,
    fetchPlanet,
  }
}

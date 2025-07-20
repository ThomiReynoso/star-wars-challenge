<template>
  <div class="planet-detail-view">
    <div class="container">
      <LoadingSpinner v-if="isLoading" />
      <ErrorMessage v-else-if="error" :message="error" />
      <PlanetDetail v-else-if="planet" :planet="planet" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlanetDetail } from '@/composables/usePlanetDetail'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import PlanetDetail from '@/components/planets/PlanetDetail.vue'

const route = useRoute()
const router = useRouter()
const { planet, isLoading, error, fetchPlanet } = usePlanetDetail()

onMounted(async () => {
  const id = route.params.id as string
  if (!id) {
    router.push('/planets')
    return
  }
  await fetchPlanet(id)
})
</script>

<style scoped lang="scss">
.planet-detail-view {
  min-height: 100vh;
  background-color: #1f2937;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>

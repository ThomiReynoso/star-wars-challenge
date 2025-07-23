<template>
  <div class="person-detail-view">
    <div class="container">
      <LoadingSpinner v-if="isLoading" />
      <ErrorMessage v-else-if="error" :message="error" />
      <PersonDetail v-else-if="person" :person="person" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePersonDetail } from '@/composables/usePersonDetail'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import PersonDetail from '@/components/people/PersonDetail.vue'

const route = useRoute()
const router = useRouter()
const { person, isLoading, error, fetchPerson } = usePersonDetail()

onMounted(async () => {
  const id = route.params.id as string
  if (!id) {
    router.push('/people')
    return
  }
  await fetchPerson(id)
})
</script>

<style scoped lang="scss">
.person-detail-view {
  min-height: 100vh;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>

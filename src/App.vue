<template>
  <div id="app" class="app">
    <NavBar />

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background-color: #111827;
}

.main {
  min-height: 100vh;
}
</style>

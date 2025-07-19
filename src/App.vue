<template>
  <div id="app" class="min-h-screen bg-gray-900">
    <NavBar />
    
    <main class="min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
</script>

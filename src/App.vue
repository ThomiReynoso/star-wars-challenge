<template>
  <div id="app" class="app">
    <!-- Skip navigation links -->
    <div class="skip-links">
      <a href="#main-content" class="skip-link">Skip to main content</a>
      <a href="#navigation" class="skip-link">Skip to navigation</a>
    </div>

    <NavBar id="navigation" />

    <main id="main-content" class="main" tabindex="-1">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'

const router = useRouter()

// Focus management on route changes
router.afterEach(() => {
  nextTick(() => {
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
    }
  })
})
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.skip-links {
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 1000;
}

.skip-link {
  position: absolute;
  padding: 8px 16px;
  background: #1f2937;
  color: #f9fafb;
  text-decoration: none;
  border: 2px solid #60a5fa;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:focus {
    top: 16px;
    left: 16px;
    outline: none;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.5);
  }

  &:nth-child(2):focus {
    left: 180px;
  }
}

.main {
  min-height: 100vh;
  position: relative;

  &:focus {
    outline: none;
  }
}
</style>

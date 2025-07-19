<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-content">
        <div class="navbar-brand">
          <!-- Logo -->
          <router-link to="/" class="logo">
            <div class="logo-text">⭐ Star Wars</div>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="navbar-nav">
          <router-link
            to="/people"
            class="nav-link"
            :class="{ active: $route.path.startsWith('/people') }"
          >
            Characters
          </router-link>

          <router-link
            to="/planets"
            class="nav-link"
            :class="{ active: $route.path.startsWith('/planets') }"
          >
            Planets
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: #1f2937;
  border-bottom: 1px solid #374151;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  height: 4rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0066cc;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #d1d5db;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    color: white;
  }

  &.active {
    color: #0066cc;
    background-color: #374151;
  }
}
</style>

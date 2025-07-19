<template>
  <div class="home">
    <div class="home-container">
      <!-- Hero Section -->
      <div class="hero">
        <h1 class="hero-title">
          Welcome to the 
          <span class="hero-highlight">Star Wars</span> 
          Universe
        </h1>
        <p class="hero-subtitle">
          Explore characters and planets from a galaxy far, far away...
        </p>
      </div>

      <!-- Navigation Cards -->
      <div class="nav-cards">
        <router-link to="/people" class="nav-card">
          <div class="nav-card-icon">👥</div>
          <h2 class="nav-card-title">Characters</h2>
          <p class="nav-card-description">
            Discover heroes, villains, and everyone in between from the Star Wars saga
          </p>
          <div class="nav-card-cta">Explore Characters →</div>
        </router-link>

        <router-link to="/planets" class="nav-card">
          <div class="nav-card-icon">🪐</div>
          <h2 class="nav-card-title">Planets</h2>
          <p class="nav-card-description">
            Journey through the diverse worlds and environments of the galaxy
          </p>
          <div class="nav-card-cta">Explore Planets →</div>
        </router-link>
      </div>

      <!-- Features -->
      <div class="features">
        <h3 class="features-title">Features</h3>
        <div class="features-grid">
          <div class="feature">
            <div class="feature-title">🔍 Search & Filter</div>
            <p class="feature-description">
              Find specific characters and planets with our powerful search functionality
            </p>
          </div>
          <div class="feature">
            <div class="feature-title">📊 Multiple Views</div>
            <p class="feature-description">
              Switch between card and table views to browse data your way
            </p>
          </div>
          <div class="feature">
            <div class="feature-title">⚡ Fast & Responsive</div>
            <p class="feature-description">
              Built with Vue 3 and TypeScript for optimal performance
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Home page component
</script>

<style lang="scss" scoped>
.home {
  padding: 4rem 1rem;
  text-align: center;
}

.home-container {
  max-width: 1024px;
  margin: 0 auto;
}

.hero {
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.hero-highlight {
  color: #0066CC;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #D1D5DB;
  margin-bottom: 2rem;
}

.nav-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.nav-card {
  background-color: #1F2937;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #374151;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #374151;
    transform: scale(1.05);
    
    .nav-card-title {
      color: #0066CC;
    }
  }
}

.nav-card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.nav-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.nav-card-description {
  color: #D1D5DB;
  margin-bottom: 1rem;
}

.nav-card-cta {
  color: #0066CC;
  font-weight: 600;
}

.features {
  background-color: #1F2937;
  border-radius: 0.5rem;
  padding: 2rem;
}

.features-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  text-align: left;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-title {
  color: #0066CC;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #D1D5DB;
  font-size: 0.875rem;
}
</style>

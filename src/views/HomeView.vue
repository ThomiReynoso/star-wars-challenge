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
            Discover heroes, villains, and everyone in between from the Star
            Wars saga
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
              Find specific characters and planets with our powerful search
              functionality
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
@use '@/assets/styles/main.scss' as *;

.home {
  padding: 4rem 1rem;
  text-align: center;
  position: relative;
}

.home-container {
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero {
  margin-bottom: 4rem;
  animation: float 6s ease-in-out infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: $text-bright;
  margin-bottom: 1.5rem;
  font-family: 'Orbitron', monospace;
  letter-spacing: 3px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.hero-highlight {
  background: linear-gradient(135deg, $primary-neon, $text-accent, $secondary-neon);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
  animation: pulse-neon 3s infinite;
}

.hero-subtitle {
  font-size: 1.4rem;
  color: $text-glow;
  margin-bottom: 2rem;
  font-style: italic;
  letter-spacing: 1px;
}

.nav-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.nav-card {
  @include holographic-card;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &:hover {
    .nav-card-title {
      color: $primary-neon;
      text-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    }

    .nav-card-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .nav-card-cta {
      color: $text-accent;
      transform: translateX(5px);
    }
  }
}

.nav-card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.3));
}

.nav-card-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: $text-bright;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.nav-card-description {
  color: $text-glow;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.nav-card-cta {
  color: $primary-neon;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  font-family: 'Orbitron', monospace;
}

.features {
  @include holographic-card;
  text-align: left;
}

.features-title {
  font-size: 2rem;
  font-weight: 700;
  color: $text-bright;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Orbitron', monospace;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(135deg, $primary-neon, $text-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature {
  padding: 1.5rem;
  border: 1px solid $border-glow;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.03), rgba(157, 78, 221, 0.03));
  transition: all 0.3s ease;

  &:hover {
    border-color: $primary-neon;
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
    transform: translateY(-3px);
  }
}

.feature-title {
  color: $text-accent;
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.feature-description {
  color: $text-glow;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>

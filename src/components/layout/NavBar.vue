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
@use '@/assets/styles/main.scss' as *;

.navbar {
  background: linear-gradient(
    135deg,
    rgba(15, 15, 35, 0.95),
    rgba(26, 26, 46, 0.9)
  );
  border-bottom: 2px solid $border-glow;
  backdrop-filter: blur(20px);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, $primary-neon, transparent);
    animation: scan 4s infinite;
  }
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
  align-items: center;
  height: 4.5rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, $primary-neon, $text-accent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  font-family: 'Orbitron', monospace;
  letter-spacing: 2px;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: $text-glow;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 212, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    color: $primary-neon;
    border-color: $border-glow;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    transform: translateY(-2px);

    &:before {
      left: 100%;
    }
  }

  &.active {
    color: $text-accent;
    background: linear-gradient(
      135deg,
      rgba(100, 255, 218, 0.1),
      rgba(0, 245, 255, 0.05)
    );
    border-color: $text-accent;
    box-shadow: 0 0 15px rgba(100, 255, 218, 0.3);
  }
}
</style>

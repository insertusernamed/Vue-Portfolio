<template>
  <header class="site-header">
    <RouterLink class="mark" to="/#top">{{ site.name }}</RouterLink>
    <nav aria-label="Primary">
      <RouterLink to="/#work">Work</RouterLink>
      <RouterLink to="/#experience">Experience</RouterLink>
      <RouterLink to="/#contact">Contact</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { site } from '../content/site'
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  height: var(--header-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc((100% - var(--page)) / 2);
  background: rgba(14, 13, 11, 0.78);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
}

.mark {
  font-family: var(--serif);
  font-size: 1.12rem;
  letter-spacing: 0.01em;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  font-family: var(--mono);
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
}

nav a:hover {
  color: var(--ink);
}

@media (max-width: 640px) {
  .mark {
    font-size: 0.95rem;
    max-width: 42%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  nav {
    gap: 0.65rem;
  }

  nav a {
    font-size: 0.74rem;
  }
}
</style>

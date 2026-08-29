<template>
  <footer id="contact" class="site-footer">
    <div class="inner">
      <p class="kicker">Contact</p>
      <h2>{{ site.email }}</h2>
      <div class="links">
        <a :href="`mailto:${site.email}`">Email</a>
        <a :href="site.github" target="_blank" rel="noopener">GitHub</a>
        <a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <RouterLink :to="site.resumePath">Resume</RouterLink>
      </div>
      <p class="fine">
        {{ site.name }} · the project index on this page is served from a GraphQL API over GitHub.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from '../content/site'
</script>

<style scoped>
.site-footer {
  padding: 5rem 0 3rem;
  border-top: 1px solid var(--line);
  margin-top: 2rem;
}

.inner {
  width: var(--page);
  margin: 0 auto;
}

h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  letter-spacing: -0.03em;
  margin: 0.6rem 0 1.4rem;
  overflow-wrap: anywhere;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.links a {
  font-family: var(--mono);
  font-size: 0.84rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 2px solid var(--line);
  padding-bottom: 0.18rem;
  color: var(--ink);
}

.fine {
  margin-top: 2.4rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  color: var(--ink-faint);
}
</style>

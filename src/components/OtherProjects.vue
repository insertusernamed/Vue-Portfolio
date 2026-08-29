<template>
  <section id="other" class="other">
    <div class="inner">
      <header>
        <p class="kicker">Index · live from GitHub</p>
        <h2>Other projects</h2>
        <p class="lede">
          Curated from a GraphQL API over my public repos. Featured work above is written by hand.
        </p>
      </header>

      <p v-if="loading && !store.allProjects.length" class="meta">Loading repository index…</p>

      <ul>
        <li v-for="project in rows" :key="project.url">
          <a :href="project.url" target="_blank" rel="noopener" class="name">{{ project.name }}</a>
          <p>{{ project.description || 'No description.' }}</p>
          <span class="langs">{{ languageLine(project) }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGitHubStore } from '../stores/githubStore'
import { featuredIds, hideRepoPattern, otherProjectFallback } from '../content/site'
import type { GitHubProject } from '../types/github'

const store = useGitHubStore()
const { loading } = storeToRefs(store)
const featured = new Set(featuredIds)

const rows = computed(() => {
  const live = store.allProjects.filter((project) => {
    if (featured.has(project.name)) return false
    if (hideRepoPattern.test(project.name)) return false
    return Boolean(project.description)
  })
  return live.length ? live : (otherProjectFallback as GitHubProject[])
})

function languageLine(project: GitHubProject) {
  return (project.languages?.nodes ?? []).map((n) => n.name).slice(0, 4).join(' · ')
}

onMounted(() => {
  store.fetchProjects().catch(() => undefined)
})
</script>

<style scoped>
.other {
  padding: 5rem 0 3rem;
}

.inner {
  width: var(--page);
  margin: 0 auto;
}

header {
  max-width: 34rem;
  margin-bottom: 2.4rem;
}

h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: -0.03em;
  margin: 0.4rem 0 0.8rem;
}

.lede,
.meta {
  color: var(--ink-dim);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

li {
  display: grid;
  grid-template-columns: minmax(10rem, 0.7fr) minmax(0, 1.4fr) minmax(8rem, 0.6fr);
  gap: 1rem;
  align-items: baseline;
  padding: 1rem 0;
  border-bottom: 1px solid var(--line);
}

.name {
  font-family: var(--mono);
  font-size: 0.95rem;
  text-decoration: none;
}

li p {
  color: var(--ink-dim);
  font-size: 0.98rem;
}

.langs {
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  color: var(--ink-dim);
  text-align: right;
}

@media (max-width: 800px) {
  li {
    grid-template-columns: 1fr;
    gap: 0.3rem;
    padding: 1.1rem 0;
  }

  .langs {
    text-align: left;
  }
}
</style>

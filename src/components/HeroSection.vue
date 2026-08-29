<template>
  <section id="top" class="hero">
    <PlotterField />
    <div class="veil"></div>
    <div class="hero-inner">
      <p class="kicker">{{ site.role }}</p>
      <h1>Daniel<br>Yevtushenko</h1>
      <p class="lede">{{ site.lede }}</p>
      <p class="stack">{{ stackLine.join(' · ') }}</p>
      <div class="actions">
        <a class="action primary" href="#work">View Work</a>
        <a class="action" :href="site.github" target="_blank" rel="noopener">GitHub</a>
        <RouterLink class="action" :to="site.resumePath">Resume</RouterLink>
      </div>
      <p class="hint" aria-hidden="true">A plotter inks the plate. Click to add another figure.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { site, stackLine } from '../content/site'
import PlotterField from './PlotterField.vue'
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  overflow: clip;
  background: var(--bg);
}

.veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(14, 13, 11, 0.97) 0%, rgba(14, 13, 11, 0.88) 28%, rgba(14, 13, 11, 0.32) 52%, rgba(14, 13, 11, 0.08) 100%),
    linear-gradient(to top, var(--bg) 0%, transparent 24%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: var(--page);
  margin: 0 auto;
  padding: calc(var(--header-h) + 4.5rem) 0 5rem;
  pointer-events: none;
}

.hero-inner :deep(a) {
  pointer-events: auto;
}

.kicker {
  font-size: 0.88rem;
  letter-spacing: 0.08em;
  color: #f0a05c;
}

h1 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(3.4rem, 9vw, 7.2rem);
  line-height: 0.92;
  letter-spacing: -0.03em;
  margin: 0.7rem 0 1.4rem;
}

.lede {
  max-width: 34rem;
  color: var(--ink);
  font-size: 1.22rem;
  line-height: 1.5;
}

.stack {
  margin-top: 1.15rem;
  font-family: var(--mono);
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: var(--ink-dim);
  max-width: 34rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1.4rem;
  margin-top: 2.1rem;
  pointer-events: auto;
}

.action {
  font-family: var(--mono);
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  border-bottom: 2px solid var(--line);
  padding: 0.15rem 0 0.28rem;
}

.action.primary {
  border-bottom-color: var(--accent);
  color: var(--accent);
}

.action:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.hint {
  margin-top: 2.4rem;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-dim);
}

@media (max-width: 720px) {
  .hero-inner {
    padding-top: calc(var(--header-h) + 3.2rem);
  }

  h1 {
    font-size: clamp(3rem, 16vw, 4.4rem);
  }

  .hint {
    display: none;
  }

  .veil {
    background:
      linear-gradient(to bottom, rgba(14, 13, 11, 0.95) 0%, rgba(14, 13, 11, 0.82) 42%, rgba(14, 13, 11, 0.22) 100%);
  }
}
</style>

<template>
  <article :id="study.id" class="study" :class="study.layout">
    <header class="study-head">
      <p class="kicker">{{ study.index }} / {{ study.kicker }}</p>
      <h2>{{ study.title }}</h2>
      <p class="lede">{{ study.lede }}</p>
    </header>

    <div v-if="study.layout === 'solver'" class="solver-stage">
      <SolverField />
    </div>
    <div
      v-else-if="study.images.length"
      class="media"
      :class="{ pair: study.images.length > 1 }"
    >
      <figure v-for="image in study.images" :key="image.src">
        <img :src="image.src" :alt="image.alt" />
      </figure>
    </div>
    <ExtractField v-else-if="study.id === 'osm'" />

    <div class="study-body">
      <div class="copy">
        <p v-for="paragraph in study.body" :key="paragraph">{{ paragraph }}</p>
      </div>
      <aside>
        <section v-if="study.layout === 'data' && study.pipeline.length">
          <h3>Pipeline</h3>
          <ol class="pipeline stacked" :aria-label="`${study.title} pipeline`">
            <li v-for="step in study.pipeline" :key="step">{{ step }}</li>
          </ol>
        </section>
        <section v-if="study.layout === 'solver'">
          <h3>Hard constraints</h3>
          <p class="stack">Room · Instructor · Student · Capacity · Daily load ≤ 3</p>
        </section>
        <section>
          <h3>{{ study.asideTitle }}</h3>
          <ul>
            <li v-for="item in study.owned" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section>
          <h3>Stack</h3>
          <p class="stack">{{ study.stack.join(' · ') }}</p>
        </section>
      </aside>
    </div>

    <ol
      v-if="study.pipeline.length && study.layout !== 'data'"
      class="pipeline"
      :aria-label="`${study.title} pipeline`"
    >
      <li v-for="step in study.pipeline" :key="step">{{ step }}</li>
    </ol>

    <p class="links">
      <a v-for="link in study.links" :key="link.href" :href="link.href" target="_blank" rel="noopener">
        {{ link.label }}
      </a>
    </p>
  </article>
</template>

<script setup lang="ts">
import ExtractField from './ExtractField.vue'
import SolverField from './SolverField.vue'
import type { featured } from '../content/site'

defineProps<{
  study: (typeof featured)[number]
}>()
</script>

<style scoped>
.study {
  width: var(--page);
  margin: 0 auto;
  padding: 4.8rem 0 2rem;
}

.study.feature {
  padding-top: 6.8rem;
  padding-bottom: 3.2rem;
}

.study.feature .study-head {
  max-width: 44rem;
}

.study.feature h2 {
  font-size: clamp(3.2rem, 8vw, 6rem);
}

.study.feature .media img {
  max-height: min(78vh, 720px);
}

.study.screens .study-head {
  max-width: none;
  margin-bottom: 1.1rem;
}

.study.screens h2 {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  margin: 0.4rem 0 0;
}

.study.screens .media.split {
  grid-template-columns: minmax(0, 1.65fr) minmax(11rem, 1fr);
  align-items: end;
  gap: 0.85rem 1.15rem;
  margin-bottom: 1.5rem;
}

.study.screens .primary img {
  max-height: min(72vh, 640px);
  aspect-ratio: 16 / 10;
}

.study.screens .secondary img {
  max-height: min(44vh, 390px);
  aspect-ratio: 5 / 4;
}

.study.screens .lede-after {
  max-width: 38rem;
  margin-bottom: 1.8rem;
}

.study.solver {
  padding-top: 4.4rem;
}

.study.solver .study-head {
  max-width: none;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(16rem, 0.75fr);
  gap: 0.5rem 2.2rem;
  align-items: end;
  margin-bottom: 1.4rem;
}

.study.solver .kicker {
  grid-column: 1 / -1;
}

.study.solver h2 {
  font-size: clamp(2.3rem, 5.2vw, 3.7rem);
  margin: 0;
}

.study.solver .lede {
  margin: 0;
  font-size: 1.08rem;
}

.solver-stage {
  margin: 0 0 2.2rem;
}

.study.solver :deep(.solver),
.study.solver :deep(canvas) {
  min-height: 28rem;
}

.study.data {
  padding-top: 4.2rem;
}

.study.data .study-head {
  max-width: none;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.7fr);
  gap: 0.6rem 2.4rem;
  align-items: end;
  margin-bottom: 1.5rem;
}

.study.data .kicker {
  grid-column: 1 / -1;
}

.study.data h2 {
  font-size: clamp(2.3rem, 5vw, 3.5rem);
  margin: 0;
}

.study.data .lede {
  margin: 0;
  font-size: 1.08rem;
  max-width: none;
}

.study.data :deep(.extract) {
  min-height: 28rem;
  margin-bottom: 2rem;
}

.study.data :deep(canvas) {
  height: 28rem;
}

.study.data .study-body {
  grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.72fr);
}

.study.data .pipeline.stacked {
  display: grid;
  margin: 0;
  padding: 0;
  border: 0;
  gap: 0;
  list-style: none;
  counter-reset: pipe;
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.92rem;
}

.study.data .pipeline.stacked li {
  padding: 0.55rem 0 0.55rem 1.7rem;
  border-top: 1px solid var(--line);
  counter-increment: pipe;
  position: relative;
}

.study.data .pipeline.stacked li::before {
  content: counter(pipe, decimal-leading-zero);
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 0.72rem;
}

.study.data .pipeline.stacked li::after {
  content: none;
}

.study-head {
  max-width: 38rem;
  margin-bottom: 2.2rem;
}

h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2.6rem, 6vw, 4.6rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin: 0.55rem 0 1rem;
}

.lede,
.lede-after {
  font-size: 1.2rem;
  color: var(--ink);
  line-height: 1.5;
}

.media {
  margin: 0 0 2.4rem;
  display: grid;
  gap: 0.7rem;
}

.media.pair {
  grid-template-columns: 1.4fr 0.8fr;
}

figure {
  margin: 0;
  background: var(--bg-2);
  border: 1px solid var(--line);
  overflow: hidden;
}

figcaption {
  padding: 0.5rem 0.75rem 0.6rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-dim);
  border-top: 1px solid var(--line);
}

img {
  width: 100%;
  max-height: min(68vh, 620px);
  object-fit: cover;
  object-position: top center;
  filter: saturate(0.86) contrast(1.03);
}

.study-body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(16rem, 0.8fr);
  gap: 2.5rem 3rem;
}

.copy p + p {
  margin-top: 1rem;
}

.copy {
  color: var(--ink);
  max-width: 40rem;
}

aside section + section {
  margin-top: 1.8rem;
}

h3 {
  font-family: var(--mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.7rem;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  position: relative;
  padding: 0.45rem 0 0.45rem 0.9rem;
  border-top: 1px solid var(--line);
  color: var(--ink-dim);
  font-size: 0.98rem;
}

li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.stack {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.7;
  color: var(--ink-dim);
}

.pipeline {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0;
  list-style: none;
  margin: 2.2rem 0 0;
  padding: 1rem 0 0;
  border-top: 1px solid var(--line);
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-dim);
}

.pipeline li:not(:last-child)::after {
  content: ' → ';
  color: var(--accent);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  margin-top: 1.6rem;
}

.links a {
  font-family: var(--mono);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 0.18rem;
}

@media (max-width: 860px) {
  .media.pair,
  .study-body,
  .study.solver .study-head,
  .study.data .study-head,
  .study.data .study-body {
    grid-template-columns: 1fr;
  }

  .study.solver :deep(.solver),
  .study.solver :deep(canvas) {
    min-height: 20rem;
  }

  .study,
  .study.feature {
    padding: 3.5rem 0 1.5rem;
  }

  .study.feature h2 {
    font-size: clamp(2.6rem, 12vw, 3.6rem);
  }
}
</style>

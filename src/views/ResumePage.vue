<template>
  <article class="resume">
    <header>
      <p class="kicker">Resume</p>
      <h1>{{ site.name }}</h1>
      <p>{{ site.role }}</p>
      <p class="meta">
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
        ·
        <a :href="site.github" target="_blank" rel="noopener">github.com/insertusernamed</a>
        ·
        <a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn</a>
      </p>
    </header>

    <section>
      <h2>Experience</h2>
      <div v-for="job in experience" :key="job.org" class="block">
        <div class="row">
          <strong>{{ job.role }}</strong>
          <span>{{ job.dates }}</span>
        </div>
        <p>{{ job.org }}</p>
        <p class="note">{{ job.note }}</p>
      </div>
    </section>

    <section>
      <h2>Selected work</h2>
      <div v-for="study in featured" :key="study.id" class="block">
        <div class="row">
          <strong>{{ study.title }}</strong>
          <span>{{ study.stack.slice(0, 4).join(', ') }}</span>
        </div>
        <p class="note">{{ study.lede }}</p>
      </div>
    </section>

    <section>
      <h2>Education</h2>
      <div v-for="item in education" :key="item.school" class="block">
        <div class="row">
          <strong>{{ item.credential }}</strong>
          <span>{{ item.dates }}</span>
        </div>
        <p>{{ item.school }}</p>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { education, experience, featured, site } from '../content/site'
</script>

<style scoped>
.resume {
  width: var(--page);
  max-width: 44rem;
  margin: 0 auto;
  padding: calc(var(--header-h) + 3rem) 0 4rem;
}

h1 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(2.8rem, 7vw, 4.4rem);
  letter-spacing: -0.03em;
  line-height: 0.95;
  margin: 0.4rem 0 0.6rem;
}

.meta,
.note {
  color: var(--ink-dim);
}

.meta {
  margin-top: 0.8rem;
  font-family: var(--mono);
  font-size: 0.78rem;
}

section {
  margin-top: 2.4rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line);
}

h2 {
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1rem;
}

.block + .block {
  margin-top: 1.2rem;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
}

.row span {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--ink-dim);
}

@media print {
  .resume {
    padding-top: 0;
    color: #111;
  }
}
</style>

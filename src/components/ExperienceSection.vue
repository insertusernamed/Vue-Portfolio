<template>
  <section id="experience" class="experience">
    <div class="inner">
      <p class="kicker">Record</p>
      <div class="grid">
        <div>
          <h2>Experience</h2>
          <ul>
            <li v-for="job in experience" :key="job.org">
              <div class="row">
                <strong>{{ job.role }}</strong>
                <span>{{ job.dates }}</span>
              </div>
              <p class="org">{{ job.org }}</p>
              <p class="note">{{ job.note }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h2>Education</h2>
          <ul>
            <li v-for="item in education" :key="item.school">
              <div class="row">
                <strong>{{ item.credential }}</strong>
                <span>{{ item.dates }}</span>
              </div>
              <p class="org">{{ item.school }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { education, experience } from '../content/site'
</script>

<style scoped>
.experience {
  padding: 4.5rem 0 2rem;
}

.inner {
  width: var(--page);
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 1.4rem;
}

h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: 2.1rem;
  margin-bottom: 1.2rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li + li {
  margin-top: 1.4rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line);
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
}

strong {
  font-weight: 550;
}

.row span {
  font-family: var(--mono);
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  color: var(--ink-dim);
  white-space: nowrap;
}

.org {
  color: var(--accent);
  margin-top: 0.25rem;
}

.note {
  color: var(--ink-dim);
  margin-top: 0.45rem;
  max-width: 34rem;
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .row {
    flex-direction: column;
    gap: 0.2rem;
  }
}
</style>

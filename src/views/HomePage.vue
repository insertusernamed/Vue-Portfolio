<template>
  <div class="portfolio-page">
    <HeroSection />
    <main id="work">
      <CaseStudy :study="featured[0]" />
      <CaseStudy :study="featured[1]" />
      <CaseStudy :study="featured[2]" />
      <OtherProjects />
      <ExperienceSection />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import CaseStudy from '../components/CaseStudy.vue'
import OtherProjects from '../components/OtherProjects.vue'
import ExperienceSection from '../components/ExperienceSection.vue'
import { featured } from '../content/site'
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#work">Skip to work</a>
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

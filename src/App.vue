<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="app-wrapper">
    <NavBar />
    <div class="main-content">
      <RouterView />
    </div>
    <FooterBar />
  </div>
</template>

<style>
@import './assets/variables.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Lato', sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-intro);
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 76px;
  /* Adjust based on navbar height */
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Resume from '../views/ResumePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/resume', name: 'resume', component: Resume },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 72 }
    }
    return { top: 0 }
  },
})

export default router

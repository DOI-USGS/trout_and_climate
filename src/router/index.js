import { createRouter, createWebHistory } from 'vue-router'
import VisualizationView from '../views/VisualizationView.vue'
import StoryPage from '../views/StoryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/0',
    },
    {
      path: '/index.html',
      name: 'Index',
      redirect: '/0',
    },
    {
      path: '/:index',
      name: 'Chapter',
      component: StoryPage,
      props: true
    }
  ]
})

export default router

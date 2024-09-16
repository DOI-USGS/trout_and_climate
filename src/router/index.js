import { createRouter, createWebHistory } from 'vue-router'
import StoryPage from '../views/StoryPage.vue'
import { store } from '@/stores/index.js';

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
      props: true,
      beforeEnter: (to, from, next) => {
        const index = parseInt(to.params.index, 10);
        const totalChapters = store.allChapters.length;
        
        // Check if the index is a valid number within the range of chapters
        if (!isNaN(index) && index >= 0 && index < totalChapters) {
          next(); // Allow navigation to the specified chapter
        } else {
          next('/0'); // Redirect to the first chapter if invalid index
        }
      }
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import StoryPage from '../views/StoryPage.vue'
import { store } from '@/stores/index.js';

function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: StoryPage,
      props: { index: 0 }, // Always set index to 0 for the root path
    },
    {
      path: "/404",
      name: "Error404",
      component: lazyLoad('Error404Page')
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
          next('/'); // Redirect to the first chapter if invalid index
        }
      }
    },
    {
      // Catch-all route for any other paths (to handle paths without trailing slash)
      path: '/:pathMatch(.*)*',
      redirect: '/',
    }
  ]
})

export default router

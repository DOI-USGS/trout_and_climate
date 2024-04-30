<template>
  <div class="home">
    <h1>Trout and Climate</h1>
    <div v-if="currentChapter">
      <h3>{{ currentChapter.text }}</h3>
      <div v-for="image in currentChapter.images" :key="image.src" :style="imageStyle(image)">
        <!-- Images -->
      </div>
      <router-link 
        :to="`/chapter/${currentIndex - 1}`" 
        :disabled="currentIndex <= 0"
        custom
        >
        <template #default="{ navigate }">
          <button @click="navigate" :disabled="currentIndex <= 0">
            Previous
          </button>
        </template>
      </router-link>
      <router-link 
        :to="`/chapter/${currentIndex + 1}`" 
        :disabled="currentIndex >= chapters.length - 1"
        custom
        >
        <template #default="{ navigate }">
          <button @click="navigate" :disabled="currentIndex >= chapters.length - 1">
            Next
          </button>
        </template>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '@/stores/index.js';

export default {
  setup() {
    const route = useRoute();
    const currentIndex = ref(parseInt(route.params.index));
    const chapters = store.chapters;

    const currentChapter = computed(() => {
      return chapters[currentIndex.value];
    });

    function imageStyle(image) {
      return {
        backgroundImage: `url(${image.src})`,
        position: 'absolute',
        top: image.y,
        left: image.x,
        width: image.width
      };
    }

    return { currentChapter, currentIndex, imageStyle };
  }
}
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}


</style>
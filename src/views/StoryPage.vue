<template>
  <div class="home">
    <h1>Trout and Climate</h1>
    <div v-if="currentChapter">
      <h2>{{ currentChapter.text }}</h2>
      <div class="images-container" :style="{ backgroundImage: `url(${currentChapter.bknd})` }">
        <div v-for="image in currentChapter.images" :key="image.src" :style="imageStyle(image)">
          <img v-if="image.src" :src="image.src" :alt="image.alt || 'Chapter Image'" />
        </div>
      </div>
      <button @click="prevChapter" :disabled="currentIndex <= 0">Previous</button>
      <button @click="nextChapter" :disabled="currentIndex >= chapters.length - 1">Next</button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '@/stores/index.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const currentIndex = ref(parseInt(route.params.index) || 0);
    const chapters = store.chapters;

    // Check if chapters are being loaded correctly
    console.log("Chapters:", chapters);

    const currentChapter = computed(() => {
      // Log current index and chapter length
      console.log("Current Index:", currentIndex.value);
      console.log("Total Chapters:", chapters.length);
      // Check if index is within bounds
      if (currentIndex.value >= 0 && currentIndex.value < chapters.length) {
        const chapter = chapters[currentIndex.value];
        console.log("Current Chapter:", chapter);
        return chapter;
      }
      console.log("Current Chapter: undefined");
      return undefined;
    });

    watch(route, () => {
      const newIndex = parseInt(route.params.index) || 0;
      console.log("Route params changed. New index:", newIndex);
      currentIndex.value = newIndex;
    });

    function nextChapter() {
      if (currentIndex.value < chapters.length - 1) {
        let nextIndexNumeric = currentIndex.value + 1;
        let index = nextIndexNumeric.toString();
        router.push({ name: 'Chapter', params: { index } });
      }
    }

    function prevChapter() {
      if (currentIndex.value > 0) {
        let prevIndexNumeric = currentIndex.value - 1;
        let index = prevIndexNumeric.toString();
        router.push({ name: 'Chapter', params: { index } });
      }
    }

    function imageStyle(image) {
      return {
        position: 'absolute',
        top: image.y,
        left: image.x,
        width: image.width,
        height: image.height,
      };
    }

    return { chapters, currentChapter, nextChapter, prevChapter, currentIndex, imageStyle };
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.images-container {
  position: relative;
  width: 100%;
  height: 400px; /* Adjust as needed */
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.images-container img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

button {
  margin: 10px;
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

button:not(:disabled):hover {
  background-color: #0056b3;
}
</style>

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
      <button v-if="!isLastIntroChapter" @click="prevChapter" :disabled="store.currentIndex <= 0">Previous</button>
      <button v-if="!isLastIntroChapter" @click="nextChapter" :disabled="store.currentIndex >= store.chapters.length - 1">Next</button>
      <div v-if="isLastIntroChapter">
        <button @click="chooseAdventure('hotWater')">Hot</button>
        <button @click="chooseAdventure('warmWater')">Warm</button>
        <button @click="chooseAdventure('coldWater')">Cold</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '@/stores/index.js';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(
      () => route.params.index,
      (newIndex) => {
        store.currentIndex = parseInt(newIndex) || 0;
      },
      { immediate: true }
    );

    const currentChapter = computed(() => {
      return store.chapters[store.currentIndex];
    });

    const isLastIntroChapter = computed(() => {
      return store.currentType === 'intro' && store.currentIndex === store.chapters.length - 1;
    });

    function nextChapter() {
      if (store.currentIndex < store.chapters.length - 1) {
        store.nextChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      }
    }

    function prevChapter() {
      if (store.currentIndex > 0) {
        store.prevChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      }
    }

    function chooseAdventure(newType) {
      store.setTypeAndIndex(newType, 0);
      router.push({ name: 'Chapter', params: { index: '0' } });
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

    return { store, currentChapter, nextChapter, prevChapter, imageStyle, isLastIntroChapter, chooseAdventure };
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

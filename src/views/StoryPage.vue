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
      <button v-if="!isLastIntroChapter && !isOutroChapter" @click="prevChapter" :disabled="store.currentIndex <= 0">Previous</button>
      <button v-if="!isLastIntroChapter && !isOutroChapter" @click="nextChapter">Next</button>
      <div v-if="isLastIntroChapter">
        <button @click="chooseAdventure('hotWater')" :disabled="store.selectedOptions.includes('hotWater')">Hot</button>
        <button @click="chooseAdventure('warmWater')" :disabled="store.selectedOptions.includes('warmWater')">Warm</button>
        <button @click="chooseAdventure('coldWater')" :disabled="store.selectedOptions.includes('coldWater')">Cold</button>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
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
      return store.allChapters[store.currentIndex];
    });

    const isLastIntroChapter = computed(() => {
      return store.currentType === 'intro' && store.currentIndex === store.lastIntroIndex;
    });

    const isOutroChapter = computed(() => {
      return store.currentType === 'outro';
    });

    function nextChapter() {
      if (store.currentIndex < store.allChapters.length - 1) {
        store.nextChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      } else if (store.currentType !== 'intro') {
        if (store.allOptionsChosen()) {
          store.navigateToOutro();
          router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
        } else {
          store.resetToIntro();
          router.push({ name: 'Chapter', params: { index: store.lastIntroIndex.toString() } });
        }
      }
    }

    function prevChapter() {
      if (store.currentIndex > 0) {
        store.prevChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      }
    }

    function chooseAdventure(newType) {
      store.selectedOptions.push(newType);
      const nextIndex = store.allChapters.length;
      store.setTypeAndIndex(newType, nextIndex);
      router.push({ name: 'Chapter', params: { index: nextIndex.toString() } });
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

    return { store, currentChapter, nextChapter, prevChapter, imageStyle, isLastIntroChapter, isOutroChapter, chooseAdventure };
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

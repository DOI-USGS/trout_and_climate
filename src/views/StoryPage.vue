<template>
    <div class="home">
      <h1>Trout and Climate</h1>
      <div v-if="currentChapter">
        <h2>{{ currentChapter.text }}</h2>
        <div v-for="image in currentChapter.images" :key="image.src" :style="imageStyle(image)">
          <!-- Images -->
        </div>
        <button @click="prevChapter" :disabled="currentIndex <= 0">Previous</button>
        <button @click="nextChapter" :disabled="currentIndex >= chapters.length - 1">Next</button>
      </div>
    </div>
  </template>
  

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores/index.js';

export default {
    setup() {
        const currentIndex = ref(0);
        const chapters = store.chapters; 
        const currentChapter = computed(() => {
            return chapters[currentIndex.value];
        });
        function nextChapter() {
            if (currentIndex.value < chapters.length - 1) {
                currentIndex.value++;
            }
        }

            function prevChapter() {
            if (currentIndex.value > 0) {
                currentIndex.value--;
            }
        }

            function imageStyle(image) {
            return {
                backgroundImage: `url(${image.src})`,
                position: 'absolute',
                top: image.y,
                left: image.x,
                width: image.width
            };
        }

        return { chapters, currentChapter, nextChapter, prevChapter, currentIndex, imageStyle };

    }
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
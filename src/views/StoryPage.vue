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
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores/index.js';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()

        const currentIndex = ref(parseInt(route.params.index))
        const chapters = store.chapters; 
        const currentChapter = computed(() => {
            return chapters[currentIndex.value];
        });

        // watch the router params for changes, and update currentIndex accordingly
        watch(route, () => {
          currentIndex.value = parseInt(route.params.index)
        })

        function nextChapter() {
            if (currentIndex.value < chapters.length - 1) {
                let nextIndexNumeric = currentIndex.value + 1
                let index = nextIndexNumeric.toString()
                // use the router to navigate to the next chapter page
                router.push({ name: 'Chapter', params: { index } })
            }
        }

        function prevChapter() {
            if (currentIndex.value > 0) {
                let prevIndexNumeric = currentIndex.value - 1
                let index = prevIndexNumeric.toString()
                // use the router to navigate to the previous chapter page
                router.push({ name: 'Chapter', params: { index } })
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
<template>
  <div class="home">
    <h1>Trout and Climate</h1>
    <div v-if="currentChapter">
      <h3>{{ currentChapter.text }}</h3>
      <!-- Only navigation logic -->
      <router-link :to="`/chapter/${currentIndex - 1}`" v-if="currentIndex > 0" custom>
        <template #default="{ navigate }">
          <button @click="navigate">Previous</button>
        </template>
      </router-link>
      <router-link :to="`/chapter/${currentIndex + 1}`" v-if="currentIndex < chapters.length - 1" custom>
        <template #default="{ navigate }">
          <button @click="navigate">Next</button>
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
    const currentIndex = ref(parseInt(route.params.index) || 0);
    const chapters = store.chapters;

    const currentChapter = computed(() => {
      return chapters[currentIndex.value] || chapters[0];
    });

    return { currentChapter, currentIndex };
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

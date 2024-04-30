<template>
  <div class="home">
    <h1>Trout and Climate</h1>
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <router-link :to="`/${chapter.id}`">{{ chapter.id }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from '@/stores/index.js';

export default {
  setup() {
    const chapters = store.chapters;
    return { chapters };
    console.log('Chapters:', store.chapters);
  }
}
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}


</style>
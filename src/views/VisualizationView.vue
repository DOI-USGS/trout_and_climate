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
export default {
  data() {
    return {
      chapters: this.$root.chapters
    };
  }
}
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}


</style>
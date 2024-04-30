<template>
  <div class="home">
    <h1>Welcome to Our Story</h1>
    <p>Select a chapter to begin:</p>
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <router-link :to="`/${chapter.id}`">{{ chapter.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapters: [
        { id: 1, title: "Chapter 1: The Beginning" },
        { id: 2, title: "Chapter 2: The Journey" },
        // Add more chapters as needed
      ]
    };
  }
}
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}


</style>
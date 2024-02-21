<template>
  <div class="sticky-grid-container">
    <div class="sticky-container">
      <!-- sticky content goes here -->
      <img :src="currentContent.image" alt="Scroll Triggered Content" />
      <p>{{ currentContent.text }}</p>
    </div>
    <!-- Additional content outside the sticky container can go here -->
  </div>
</template>



<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const content = ref([]);
const currentContent = ref({ id: '', order: '', image: '', text: '' });
const publicPath = import.meta.env.BASE_URL;

const loadContent = async () => {
  try {
    const response = await axios.get(`${publicPath}assets/text/content.json`); // Adjust the path if necessary
    console.log(response.data)
    content.value = response.data;
    currentContent.value = content.value[0]; // Initialize with the first item
  } catch (error) {
    console.error('Failed to load content:', error);
  }
};

const checkScroll = () => {
  const scrollPosition = window.scrollY;
  const index = Math.min(Math.floor(scrollPosition / window.innerHeight), content.value.length - 1);
  currentContent.value = content.value[index];
};

onMounted(() => {
  loadContent();
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped>
.sticky-grid-container {
  display: grid;
  place-items: center;
  height: 100vh; /* Full height of the viewport */
  position: sticky;
  top: 0;
}

.sticky-grid-item {
  /* Adjust this as needed for content sizing and layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sticky-grid-item img {
  max-width: 100%; /* Ensure image does not overflow container */
  height: auto;
}
</style>


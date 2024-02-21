<template>
  <div class="container">
    <div class="sticky-image-container" ref="stickyContainer">
      <img :src="currentImage.image" :alt="currentImage.alt" />
      <p>{{ currentImage.text }}</p>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ScrollTriggerImage',
  setup() {
    const currentImage = ref({});
    const images = ref([]);
    const publicPath = import.meta.env.BASE_URL;

    // Load images from JSON
    const loadImages = async () => {
      try {
        const response = await fetch(publicPath + '/assets/text/content.json');
        const data = await response.json();
        images.value = data.sort((a, b) => a.order - b.order);
        currentImage.value = images.value[0]; // Initialize with the first image
      } catch (error) {
        console.error('Failed to load images', error);
      }
    };

    // GSAP ScrollTrigger
    const setupScrollTrigger = () => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: ".container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          markers: true,
          onUpdate: self => {
            const progress = self.progress;
            const index = Math.min(
              images.value.length - 1,
              Math.floor(progress * images.value.length)
            );
            currentImage.value = images.value[index];
          }
        }
      });
    };

    onMounted(async () => {
      await loadImages();
      setupScrollTrigger();
    });

    return { currentImage };
  }
};
</script>

<style>
.container {
  height: 200vh; /* Ensures enough scrolling length */
}

.sticky-image-container {
  position: sticky;
  top: 0;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sticky-image-container img {
  max-width: 100%;
  max-height: 80%;
}
.sticky-image-container p {
  font-size: 1.5rem;
  text-align: center;
}
</style>

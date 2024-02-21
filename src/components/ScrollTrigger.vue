<template>
  <div class="container">
      <div class="background-image-container" 
        :alt="currentImage.alt"
        :style="{ backgroundImage: 'url(' + currentImage.bknd + ')' }"></div>
      <div class="sticky-image-container" ref="stickyContainer">
        <div class="image-wrapper" ref="imageWrapper">
      <img :src="currentImage.image"  />
    </div>
      <div class="image-text" ref="textWrapper">{{ currentImage.text }}</div>
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
    const imageWrapper = ref(null);
    const textWrapper = ref(null);
    const currentImage = ref({
      bknd: '',
      image: '',
      text: '',
    });
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

    // Method to update images only if they are different
     const updateImagesIfDifferent = (newImage) => {
      // Update background image if different
      if (newImage.bknd && currentImage.value.bknd !== newImage.bknd) {
        currentImage.value.bknd = newImage.bknd;
      }
      // Update foreground image if different and not empty
      if (newImage.image && currentImage.value.image !== newImage.image) {
        currentImage.value.image = newImage.image;
      } else if (!newImage.image) {
        // Handle empty foreground image
        currentImage.value.image = '';
      }
      // Update text if different
      if (newImage.text && currentImage.value.text !== newImage.text) {
        currentImage.value.text = newImage.text;
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
            const newImage = images.value[index];
            updateImagesIfDifferent(newImage);
          },
          onEnterBack: () => {
            // Explicitly set to the first image when scrolling back past the start
            const firstImage = images.value[0];
            currentImage.value = { ...initialImage };
          }
        }
      });
    };

    onMounted(async () => {
      await loadImages();
      setupScrollTrigger();
    });

    return { 
      currentImage,
      imageWrapper,
      textWrapper 
    };
  }
};
</script>

<style>
.container {
  display: grid;
  grid-template-areas: "overlay";
  height: 400vh; /* Sets scrolling length */
  margin: 50px;
  box-sizing: border-box;
  max-width: calc(100vw - 40px); /* Subtract total horizontal margins from 100vw */
  position: relative; /* Ensure ScrollTrigger can track its position */
}

.background-image-container, .sticky-image-container {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 20px;
  grid-area: overlay;
  height: calc(100vh - 50px); /* Full viewport height */
  width: 100%; /* Full width */
  z-index: 1; /* Background image z-index */
}
.background-image-container {
  width: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1; /* Ensure it stays behind the foreground image */
}

.sticky-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Ensures it's above the background */
}

.sticky-image-container img {
  max-width: 100%;
  max-height: 80vh;
}
.image-text {
  margin-top: 20px;
  text-align: center;
  position: absolute; /* Make text always visible on top */
  bottom: 10%; /* Adjust based on your preference */
  width: 100%; /* Ensure text is centered regardless of image width */
  z-index: 3; /* Ensure text is above all */
}
</style>

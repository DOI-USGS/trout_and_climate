<template>
  <div class="container">
      <div class="background-image-container" 
        ref="backgroundWrapper"
        :alt="currentImage.alt"
        :style="{ backgroundImage: 'url(' + currentImage.bknd + ')' }"></div>
      <div class="sticky-image-container" ref="stickyContainer">
        <div class="image-wrapper" ref="imageWrapper">
           <!-- SVG to dynamically include images -->
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" >
            <image v-for="(img, index) in currentImage.images" 
                   :key="index" 
                   :href="img.src"
                   :x="img.x" :y="img.y" 
                   :width="img.width" :height="img.height" />
          </svg>
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
  name: 'ScrollTriggerStory',
  setup() {
    const currentImage = ref({
      id: '',
      order: '',
      bknd: '',
      images: [
        ''
      ],
      text: '',
      alt: ''
    });
    const images = ref([]);
    const stickyContainer = ref(null);
    const imageWrapper = ref(null);
    const backgroundWrapper = ref(null);
    const textWrapper = ref(null);
    const publicPath = import.meta.env.BASE_URL;

    // Load images from JSON
    const loadImages = async () => {
      try {
        const response = await fetch(publicPath + '/assets/text/content.json');
        const data = await response.json();
        images.value = data.sort((a, b) => a.order - b.order);
        currentImage.value = images.value[0]; // Initialize with the first step
      } catch (error) {
        console.error('Failed to load images', error);
      }
    };

    // Update images if they are different b/w steps, apply fade animation
    const updateImagesIfDifferent = (newStep) => {
      // Check if there is any change
      const isImageDifferent = JSON.stringify(currentImage.value.images) !== JSON.stringify(newStep.image);
      const isBackgroundDifferent = currentImage.value.bknd !== newStep.bknd;
      const isTextDifferent = currentImage.value.text !== newStep.text;

      if (isImageDifferent || isBackgroundDifferent || isTextDifferent) {
        // Fade out current elements
        gsap.to([imageWrapper.value, textWrapper.value, backgroundWrapper.value], {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Update elements only if they are different
            if (isImageDifferent) {
              currentImage.value.images = [...newStep.images]; 
            }
            if (isBackgroundDifferent) {
              currentImage.value.bknd = newStep.bknd;
            }
            if (isTextDifferent) {
              currentImage.value.text = newStep.text;
            }

            // Fade in with new content
            gsap.to([imageWrapper.value, textWrapper.value, backgroundWrapper.value], {
              opacity: 1,
              duration: 0.5
            });
          }
        });
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
            const newStep = images.value[index];
            updateImagesIfDifferent(newStep);
          },
          onEnterBack: () => {
            // Explicitly set to the first image when scrolling back past the start
            const firstImage = images.value[0];
            currentImage.value = { ...initialImage };
            gsap.to([imageWrapper.value, textWrapper.value], {
              opacity: 1,
              duration: 0.5
            });
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
      stickyContainer,
      imageWrapper,
      textWrapper,
      backgroundWrapper
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

.image-wrapper {
  width: 100%; /* Adjust based on your layout */
  height: auto; /* Adjust if you have a specific height in mind */
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper svg {
  max-width: 100%;
  height: auto; /* Adjust to maintain aspect ratio or fill a specific height */
}

</style>

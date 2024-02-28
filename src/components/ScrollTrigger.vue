<template>
  <div class="container">
    <div class="overlay-container"> 
      <img class="background-image" 
           ref="backgroundWrapper"
           :src="currentImage.bknd" 
           :alt="currentImage.alt">
      <div class="sticky-image-container" ref="stickyContainer">
        <div class="image-wrapper" ref="imageWrapper">
          <svg id="fishSVG" viewBox="0 0 16 9" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <rect height="100%" width="100%" fill="blue" opacity="0.4"></rect>
            <image v-for="(img, index) in currentImage.images" 
                   :key="index" 
                   :href="img.src"
                   :x="img.x" :y="img.y" 
                   :width="img.width" />
          </svg>
        </div>
      </div>
        <div class="text-container" ref="textWrapper">{{ currentImage.text }}</div>

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
      const isImageDifferent = JSON.stringify(currentImage.value.images) !== JSON.stringify(newStep.images);
      const isBackgroundDifferent = currentImage.value.bknd !== newStep.bknd;
      const isTextDifferent = currentImage.value.text !== newStep.text;

      // Apply fade transition to the background if different
      if (isBackgroundDifferent) {
        applyFadeTransition(backgroundWrapper, newStep.bknd, (newValue) => {
          currentImage.value.bknd = newValue;
        });
      }

      // Apply fade transition to images if different
      if (isImageDifferent) {
        applyFadeTransition(imageWrapper, newStep.images, (newValue) => {
          currentImage.value.images = [...newValue];
        });
      }

      // Apply fade transition to text if different
      if (isTextDifferent) {
        applyFadeTransition(textWrapper, newStep.text, (newValue) => {
          currentImage.value.text = newValue;
        });
      }
    };

    function applyFadeTransition(elementRef, newValue, updateFunction) {
      gsap.to(elementRef.value, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          // Check if there's an update function and a new value to apply
          if (updateFunction && newValue !== undefined) {
            updateFunction(newValue);
          }
          // Fade the element back in
          gsap.to(elementRef.value, {
            opacity: 1,
            duration: 0.25
          });
        }
      });
    }




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
            console.log(index)
            updateImagesIfDifferent(newStep);
          },
          onEnterBack: () => {
            // Explicitly set to the first image when scrolling back past the start
            const firstImage = images.value[0];
            currentImage.value = { ...firstImage };
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
      backgroundWrapper,
      applyFadeTransition
    };
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 800vh; /* Sets scrolling length */
  margin: 50px auto;
  width: calc(100vw - 100px); /* Adjust for margins */
  position: relative; /* For ScrollTrigger */
  max-width: 1600px;
}

.overlay-container {
  display: grid; /* Use grid to overlay images */
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 50px;
  height: calc(100vh - 100px); /* Full viewport height */
  width: 100%; 
  z-index: 1; /* For stacking context */
}

.background-image, .sticky-image-container {
  grid-area: 1 / 1 / 3 / 4; /* Position on the grid */
  width: 100%; 
  height: 100%; 
}

.background-image {
  object-fit: contain; /* Cover the container without losing aspect ratio */
  z-index: -1; /* Behind the sticky images */
}

.sticky-image-container {
  grid-area: 1 / 1 / 3 / 4; /* Position on the grid */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; /* Ensures it's above the background */
}

.sticky-image-container img {
  grid-area: 1 / 1 / 3 / 4; /* Position on the grid */
  max-width: 100%;
  max-height: 100%;
}
.sticky-image-container svg {
  grid-area: 1 / 1 / 3 / 4; /* Position on the grid */
  max-width: 100%;
  max-height: 100%;
}
.text-container {
  grid-area: 3 / 1 / 4 / 4; /* Position on the grid */
  width: 100%;
  max-width: 800px; /* 50-75 characters per line */
   /* Center the text vertically and horizontally in the grid area */
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  z-index: 3; /* Text on top */
}

.image-wrapper {
  width: 100%; 
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper svg {
  max-width: 100%;
  height: auto;
}

</style>

<template>
  <div class="container">
    <div class="overlay-container"> 
      <img class="background-image" 
           ref="backgroundWrapper"
           :src="currentStep.bknd" 
           :id="currentStep.id"
           :alt="currentStep.alt">
      <div class="sticky-image-container" ref="stickyContainer">
        <div class="image-wrapper" ref="imageWrapper">
          <svg id="fishSVG" viewBox="0 0 16 9" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <image v-for="(img, index) in currentStep.images" 
                   :key="index" 
                   :href="img.src"
                   :x="img.x" :y="img.y" 
                   :width="img.width" />
          </svg>
        </div>
      </div>
        <div class="text-container" ref="textWrapper">
          {{ currentStep.text }}
          <!-- Buttons Conditionally Rendered -->
        <div v-if="currentStep.id === 'chooseYourOwnAdventure'" class="button-container">
          <RetroButton class="CYOA" :button-style="{ color: 'white' }" id="hot" @click="addSection('hotWater')" label="HOT"/>
          <RetroButton class="CYOA" id="cold" @click="addSection('coldWater')" label="COLD" />
          <RetroButton class="CYOA" id="warm" @click="addSection('warmWater')" label="WARM" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted, ref, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RetroButton from './RetroButton.vue';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ScrollTriggerStory',
  components: {
    RetroButton
  },
  setup() {
    // Define a reactive property to hold the full dataset
    const fullData = ref({});
    const currentStep = ref({
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

        // Store the fetched data in fullData
       fullData.value = data;

        images.value = data.intro.sort((a, b) => a.order - b.order); // Start with intro content only
        console.log(images.value)
        currentStep.value = images.value[0]; // Initialize with the first step in 'intro' array

      } catch (error) {
        console.error('Failed to load images', error);
      }
    };

    // Update images if they are different b/w steps, apply fade animation
    const updateImagesIfDifferent = (newStep) => {
      const isImageDifferent = JSON.stringify(currentStep.value.images) !== JSON.stringify(newStep.images);
      const isBackgroundDifferent = currentStep.value.bknd !== newStep.bknd;
      const isTextDifferent = currentStep.value.text !== newStep.text;

      // Apply fade transition to the background if different
      if (isBackgroundDifferent) {
        applyFadeTransition(backgroundWrapper, newStep.bknd, (newValue) => {
          currentStep.value.bknd = newValue;
        });
      }

      // Apply fade transition to images if different
      if (isImageDifferent) {
        applyFadeTransition(imageWrapper, newStep.images, (newValue) => {
          currentStep.value.images = [...newValue];
        });
      }

      // Apply fade transition to text if different
      if (isTextDifferent) {
        applyFadeTransition(textWrapper, newStep.text, (newValue) => {
          currentStep.value.text = newValue;
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

    const advanceToNextStep = (targetId = null) => {
      let targetIndex = -1;
      console.log(targetId)

      if (targetId) {
        // If an ID is provided, find the index of the step with that ID
        targetIndex = images.value.findIndex(image => image.id === targetId);
      } else {
        // If no ID is provided, just move to the next step in the sequence
        const currentIndex = images.value.findIndex(image => image.id === currentStep.value.id);
        if (currentIndex >= 0 && currentIndex < images.value.length - 1) {
          targetIndex = currentIndex + 1;
        }
      }

      // Update the current step if a valid target index is found
      if (targetIndex !== -1) {
        const nextStep = images.value[targetIndex];
        currentStep.value = { ...nextStep };

        // TODO: manage scrolling or other actions to reflect the step change
      }
    };
    // Append next section when button is pressed
    const addSection = (contentKey) => {
      const additionalContent = fullData.value[contentKey];
      if (additionalContent && additionalContent.length > 0) {
        // Calculate the new starting order based on the last frame's order
        const maxCurrentOrder = images.value.reduce((max, item) => Math.max(max, item.order), 0);

        // Adjust the order of the new content
        const adjustedAdditionalContent = additionalContent.map(item => ({
          ...item,
          order: item.order + maxCurrentOrder
        })).sort((a, b) => a.order - b.order);

        // Merge and re-sort the main images array
        images.value = [...images.value, ...adjustedAdditionalContent].sort((a, b) => a.order - b.order);

        // Update the UI by advancing to the next frame
        advanceToNextStep(adjustedAdditionalContent[0].id);
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
          markers: false,
          onUpdate: self => {
            const progress = self.progress;
            const index = Math.min(
              images.value.length - 1,
              Math.floor(progress * images.value.length)
            );
            // Update step
            const newStep = images.value[index];
            // Update step id
            if (currentStep.value.id !== newStep.id) {
              currentStep.value = { ...newStep }; // Reassign to trigger reactivity
            }
            // Transition images if different from prior step
            updateImagesIfDifferent(newStep);

            // Debugging
            console.log("Current id:", currentStep.value.id);
            console.log("Current step:", currentStep.value);

          },
          onEnterBack: () => {
            // Explicitly set to the first image when scrolling back past the start
            const firstImage = images.value[0];
            currentStep.value = { ...firstImage };
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
      await nextTick();
      setupScrollTrigger();
    });

    return { 
      fullData,
      currentStep,
      stickyContainer,
      imageWrapper,
      textWrapper,
      backgroundWrapper,
      applyFadeTransition,
      advanceToNextStep,
      addSection
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
  grid-template-rows: 3fr 3fr 2fr;
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
.button-container {
  grid-area: 2 / 2 / 3 / 3; /* Position on the grid */
  display: flex;
  width: 100%;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index:10;
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

.CYOA {
  width: 120px;
}
</style>

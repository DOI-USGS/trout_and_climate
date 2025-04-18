<template>
  <div id="grid-container-viz" class="home">
    <h1 id="page-title">Managing Redband Trout for Climate Resilience</h1>

    <!-- Desktop Layout: Buttons on either side of the image -->
    <div v-if="!mobileView" id="chapter-content-desktop">
      <RetroButton
        id="prev-button-desktop"
        label="&#8249;"
        @click="prevChapter"
        :isDisabled="isFirstPage"
        :style="{ visibility: isFirstPage ? 'hidden' : 'visible' }"
        aria-label="Previous page"
      />
      <div id="images-container">
        <picture v-if="currentChapter?.bknd">
          <!-- WebP format for modern browsers -->
          <source
            :srcset="`${currentChapter.bknd}-640.webp 640w, ${currentChapter.bknd}-1000.webp 1000w`"
            type="image/webp"
          />
          <!-- JPG format as a fallback -->
          <source
            :srcset="`${currentChapter.bknd}-640.jpg 640w, ${currentChapter.bknd}-1000.jpg 1000w`"
            type="image/jpeg"
          />
          <!-- Fallback img element for non-supporting browsers -->
          <img
            :src="`${currentChapter.bknd}-1000.jpg`"
            :alt='`${currentChapter.alt} Narrative text states: ${(currentChapter.text.replace(/<mark>|<\/mark>|<span class=|>|<\/span>|<br>/g,""))}` || "Chapter Image"'
            sizes="(max-width: 640px) 640px, 1000px"
            tabindex="0"
            :loading="isFirstChapter ? 'eager' : 'lazy'"
          />
        </picture>
      </div>
      <RetroButton
        id="next-button-desktop"
        label="&#8250;"
        @click="nextChapter"
        :isDisabled="isLastPage"
        :style="{ visibility: isLastPage ? 'hidden' : 'visible' }"
        aria-label="Next page"
      />
    </div>

    <!-- Mobile Layout: Buttons below image -->
    <div v-else id="chapter-content-mobile">
      <div id="images-container">
        <picture v-if="currentChapter?.bknd">
          <!-- WebP format for modern browsers -->
          <source
            :srcset="`${currentChapter.bknd}-640.webp 640w, ${currentChapter.bknd}-1000.webp 1000w`"
            type="image/webp"
          />
          <!-- JPG format as a fallback -->
          <source
            :srcset="`${currentChapter.bknd}-640.jpg 640w, ${currentChapter.bknd}-1000.jpg 1000w`"
            type="image/jpeg"
          />
          <!-- Fallback img element for non-supporting browsers -->
          <img
            :src="`${currentChapter.bknd}-640.jpg`"
            :alt='`${currentChapter.alt} Narrative text states: ${(currentChapter.text.replace(/<mark>|<\/mark>|<span class=|>|<\/span>|<br>/g,""))}` || "Chapter Image"'
            sizes="(max-width: 640px) 640px, 1000px"
          />
        </picture>
      </div>
      <div id="button-container-mobile">
        <RetroButton
          id="prev-button-mobile"
          label="&#8249;"
          @click="prevChapter"
          :isDisabled="isFirstPage"
          :style="{ visibility: isFirstPage ? 'hidden' : 'visible' }"
          aria-label="Previous page"
        />
        <RetroButton
          id="next-button-mobile"
          label="&#8250;"
          @click="nextChapter"
          :isDisabled="isLastPage"
          :style="{ visibility: isLastPage ? 'hidden' : 'visible' }"
          aria-label="Next page"
        />
      </div>
    </div>

    <!-- Navigation Tracker -->
    <div id="navigation-tracker">
      <button
        v-for="(chapter, index) in totalChapters"
        :key="index"
        class="tracker-circle"
        :class="{ active: store.currentIndex === index }"
        :aria-label="`Enter page ${index + 1} of 17`"
        @click="goToChapter(index)"
      ></button>
    </div>

    <!-- Chapter Text for both Mobile and Desktop -->
    <div id="chapter-text" v-if="currentChapter?.text">
      <p 
        v-html="currentChapter.text"
        aria-hidden="true"></p>
    </div>

  </div>
  <br/>
    <hr class="content-divider" />
    <div id="references-container">
      <ReferencesSection />
      </div>

      <hr class="content-divider" />
    <div id="authorship-container">
      <h2>USGS Vizlab</h2>
      <p tabindex="0">
        This site was created by the <a href='https://labs.waterdata.usgs.gov/visualizations/'>USGS Vizlab</a>. The content was inspired by USGS data releases and publications by <a href='https://www.usgs.gov/staff-profiles/jason-b-dunham'>Jason Dunham</a> and <a href='https://www.usgs.gov/staff-profiles/joseph-r-benjamin'>Joseph Benjamin</a>. Leo Ivey and <a href='https://www.usgs.gov/index.php/staff-profiles/althea-a-archer'>Althea Archer</a> developed the data visualizations, illustrations, and storyline as part of Leo's internship through the <a href='https://www.usgs.gov/youth-and-education-in-science/cooperative-summer-fellowship-programs'>USGS YES Cooperative Summer Fellowship Program</a>. <a href='https://www.usgs.gov/staff-profiles/cee-nell'>Cee Nell</a> and <a href='https://www.usgs.gov/staff-profiles/hayley-corson-dosch'>Hayley Corson-Dosch</a> created the website. 
      </p>
      </div>

</template>


<script>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '@/stores/index.js';
import { isMobile } from 'mobile-device-detect';
import RetroButton from '@/components/RetroButton.vue';
import ReferencesSection from '@/components/ReferencesSection.vue';

export default {
  components: {
    RetroButton,
    ReferencesSection
  },
  props: {
    index: {
      type: [Number, String],
      required: false
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const totalChapters = computed(() => store.allChapters.length);
    const isFirstChapter = computed(() => store.currentIndex === 0); 

    function goToChapter(index) {
      if (index === 0) {
        router.push('/'); // Navigate to root for Chapter 0
      } else {
        router.push({ name: 'Chapter', params: { index: index.toString() } });
      }
      store.currentIndex = index;
    }


    // Watch the route's index parameter and update the store's currentIndex
    watch(
      () => route.params.index,
      (newIndex) => {
        let index = parseInt(newIndex, 10);

        // If no index is provided (e.g., root path "/"), set index to 0
        if (isNaN(index)) {
          index = 0;
        }

        // Ensure the parsed index is a valid number and within bounds
        if (index >= 0 && index < totalChapters.value) {
          store.currentIndex = index;
        } else {
          // Redirect to the root if the index is invalid
          router.push('/');
        }
      },
      { immediate: true }
    );

    const mobileView = isMobile;

    /* navigation helpers */
    const currentChapter = computed(() => {
      return store.allChapters[store.currentIndex];
    });
    const isFirstPage = computed(() => {
      return store.currentIndex === 0;
    });
    const isLastPage = computed(() => {
      return store.currentIndex === 18;
    });

    function nextChapter() {
        store.nextChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
    }

    function prevChapter() {
      if (store.currentIndex > 0) {
        store.prevChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      }
    }

    function imageStyle(image) {
      return {
        position: 'absolute',
        top: image.y,
        left: image.x,
        width: image.width,
        height: image.height,
      };
    }

    return {
      store,
      currentChapter,
      nextChapter,
      prevChapter,
      imageStyle,
      isFirstPage,
      isLastPage,
      mobileView,
      totalChapters,
      isFirstChapter,
      goToChapter
    };
  }
};
</script>

<style scoped>
#grid-container-viz {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
#page-title {
  margin: 0 auto;
  text-align: center;
  line-height: 1.5;
  padding-bottom: 10px;
}
#chapter-content-desktop {
  display: flex;
  justify-content: space-between; 
  align-items: stretch; 
  height: 100%;
  flex-grow: 1;
  max-height: 600px;
}
#chapter-content-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  min-height: 35vh;
}

#button-container-mobile {
  display: flex;
  width: 100%;
  justify-content: space-between; 
  align-self: flex-end;
}
#chapter-text {
  flex-grow: 1; 
  display: flex;
  align-items: top;
  justify-self: center;
  padding: 20px 20px;
}
#prev-button-mobile, #next-button-mobile {
  width: 100%;
  height: auto;
  font-size: 2rem;
  margin: 0;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: #00264C 2px 5px 10px -5px;
  cursor: pointer;
}

#prev-button-desktop, #next-button-desktop {
  display: flex;
  flex-grow: 1;
  width: 120px;
  height: 60vh;
  /*height: 60vh;*/
  max-height: 600px;
  font-size: 6rem;
  margin:0;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: #00264C 2px 5px 10px -5px;
  cursor: pointer;
}

#next-button-desktop:focus, #next-button-mobile:focus, #prev-button-desktop:focus, #prev-button-mobile:focus{ /* for keyboard navigation */
  border-width: 5px
}
#references {
  margin-top: 20px;
  padding: 0 10px;
}
#images-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /*display: flex;*/
  flex-grow: 1;
  width: 100%;
  /*height: 100%;*/
  height: 100%;
  max-height: 600px; 
  text-align: center;
  @media only screen and (max-height: 770px) {
    max-height: 60vh;
  }
}

#images-container img {
  max-width: 100%;
  max-height: 600px;
  object-fit: contain;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: #00264C 2px 5px 10px -5px;
  @media only screen and (max-height: 770px) {
    max-height: 60vh;
  } 
}
.content-divider {
  border: 0;
  height: 1px;
  background: #ccc; 
  margin: 20px 0 ; 
}
#authorship-container p {
  font-size:2rem;
  margin-bottom: 50px;
  padding: 0 10px;
}

#navigation-tracker {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  overflow-x: hidden;
  max-width:100%;
  box-sizing: border-box;
}

.tracker-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ccc;
  border-color: #ccc; 
  border-width: 0px;
  margin: 0 4px;
  cursor: pointer;  
}

.tracker-circle.active {
  background-color: var(--trout-blue); /* Highlight color for the active chapter */
  border-color: var(--trout-blue); 
}
.tracker-circle:focus-visible {
  box-shadow: 0 0 0 3px rgba(21, 156, 228, 0.4);
  border-color: #ccc; 
  border-width: 0px;
}

/* Mobile-specific styles */
@media screen and (max-width: 600px) {
  #grid-container-viz {
    max-height: 120vh;
  }
  #chapter-content-mobile {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }
  #page-title {
    line-height: 3.5rem;
  }
  #chapter-text {
    width: 100%; 
    padding: 10px;
    flex-grow: 1;
  }
  #images-container {
    flex-grow: 0;
    width: 100%;
    height: auto;
    max-height: 60vh;
    margin-top: 5px;
  }
  #button-container-mobile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: auto;
    align-self: end;
    padding: 10px;
  }
  #button-container-mobile > * {
    width: 50%;
    height: 80px;
    font-size: 7rem;
    margin: 0;
    text-align: center;
    
  }
  .tracker-circle {
    width: 10px;
    height: 10px;
    margin: 2px;
    padding: 0.1rem;
  }
}
</style>

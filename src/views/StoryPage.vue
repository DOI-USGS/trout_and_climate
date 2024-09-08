<template>
  <div id="grid-container-viz" class="home">
    <h1 id="page-title">Mangaging Redband Trout for climate resilience</h1>
    <div id="images-container" >
      <img :src="currentChapter.bknd" :alt="currentChapter.alt || 'Chapter Image'" />
    </div>
    <div id="chapter-content">
      <RetroButton
      id = "prev-button"
      label="&#8249;"
      :buttonStyle="prevButtonStyle"
      @click="prevChapter"
      :isDisabled="isFirstPage"
      :style="{ visibility: isFirstPage ? 'hidden' : 'visible' }"
      />
      <div id="chapter-text" v-if="currentChapter">
        <p v-html="currentChapter.text"></p>
      </div>
      <RetroButton
        id = "next-button"
        label="&#8250;"
        :buttonStyle="nextButtonStyle"
        @click="nextChapter"
        :isDisabled="isReferencesPage"
        :style="{ visibility: isReferencesPage ? 'hidden' : 'visible' }"
      />
    </div>
  </div>
  <br/>
    <hr class="content-divider" />
    <br/>
    <div id="references-container">
      <ReferencesSection />
    </div>
  <hr class="content-divider" />
    <div id="references-container">
      <h2>Made by the <a href='https://labs.waterdata.usgs.gov/visualizations/'>USGS Vizlab</a></h2>
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
  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(
      () => route.params.index,
      (newIndex) => {
        store.currentIndex = parseInt(newIndex) || 0;
        if (window.innerWidth <= 600) {
          document.querySelector('.app-container').classList.add('scroll-locked');
        }
      },
      { immediate: true }
    );

    const mobileView = isMobile;

    const currentChapter = computed(() => {
      return store.allChapters[store.currentIndex];
    });

    const isFirstPage = computed(() => {
      return store.currentIndex === 0;
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

    const prevButtonStyle = {
      color: 'black'
    };

    const nextButtonStyle = {
      color: 'black'
    };

    return {
      store,
      currentChapter,
      nextChapter,
      prevChapter,
      imageStyle,
      isFirstPage,
      prevButtonStyle,
      nextButtonStyle,
      mobileView
    };
  }
};
</script>

<style scoped>

  #grid-container-viz {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
   /*  width: 100%;
    margin: 0 auto 0 auto;
    height: 90vh;
    grid-template-columns: 1fr;
    column-gap: 0;
    grid-template-rows: max-content auto 1fr;
    row-gap: 2vh;
    grid-template-areas:
      "title"
      "image"
      "chapter-content";
    @media screen and (max-height: 770px) {
      grid-template-rows: max-content auto 15vh max-content;
    }
    @media screen and (max-width: 600px) {
      column-gap: 5%;
      grid-template-rows: max-content auto minmax(18vh, max-content) max-content max-content;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 
        "title"
        "image"
        "chapter-content"
        "prev next"
      ;
    } */
  }
  #page-title {
    margin: 0 auto;
    text-align: center;
    line-height:2;
  }
  #chapter-content {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch; /* Ensure items stretch to fill the container height */
    height: 100%; /* Full height of the container */
    margin-top: 20px;
  }
  #chapter-text {
    flex-grow: 1; /* Allow the text container to grow and take available space */
    display: flex;
    align-items: center;
    justify-self: center;
    padding: 0 20px;
  }
  #images-container {
    grid-area: image;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top: 20px;

  }
  #prev-button, #next-button {
    font-size: 6rem; /* Large font size for the arrows */
    background-color: white;
    border: none;
    width: 10px; /* Set width for the buttons */
    min-width: 100px;
    height: 100%; /* Full height of the chapter-content container */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  #start-button {
    grid-area: start;
    align-self: start;
  }
  #end-button {
    grid-area: end;
    align-self: start;
  }
  #references {
    margin-top: 20px;
  }

#images-container img {
  max-width: 100%;
  max-height: 562.5px;
  object-fit: contain;
  @media screen and (max-height: 770px) {
    max-height: 60vh;
  }
  @media screen and (max-width: 600px) {
    height: 30vh;
  }
}
/* Horizontal line between content and references */
.content-divider {
  border: 0;
  height: 1px;
  background: #ccc; /* Light gray color for the line */
  margin: 20px 0 ; /* Add space above and below the line */
}
</style>

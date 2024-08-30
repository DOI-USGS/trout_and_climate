<template>
  <div id="grid-container-viz" class="home">
    <h1 id="page-title">The Adventures of Mike & Barry</h1>
    <div id="chapter-text" v-if="currentChapter">
      <p >{{ currentChapter.text }}</p>
    </div>
    <div v-if="currentChapter && !isReferencesChapter" id="images-container" >
      <img v-if="currentChapter.bknd" :src="currentChapter.bknd" :alt="currentChapter.alt || 'Chapter Image'" />
    </div>
    <ReferencesSection v-if="isReferencesChapter" />
    <RetroButton
      id = "prev-button"
      label="Previous"
      :buttonStyle="prevButtonStyle"
      @click="prevChapter"
      :isDisabled="store.currentIndex <= 0 | isReferencesChapter"
    />
    <RetroButton
      id = "next-button"
      v-if="store.currentIndex < store.allChapters.length"
      label="Next"
      :buttonStyle="nextButtonStyle"
      @click="nextChapter"
      :isDisabled="isReferencesChapter"
    />
    <RetroButton
      id = "start-button"
      label="Restart"
      :buttonStyle="introButtonStyle"
      @click="navigateToStart"
      :isDisabled="store.currentIndex <= 0"
    />
    <RetroButton
      id = "end-button"
      label="References"
      :buttonStyle="referencesButtonStyle"
      @click="navigateToReferences"
      :isDisabled="isReferencesChapter"
    />
    
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

    const isLastIntroChapter = computed(() => {
      return store.currentType === 'intro' && store.currentIndex === store.lastIntroIndex;
    });

    const isReferencesChapter = computed(() => {
      return store.currentType === 'outro';
    });

    function nextChapter() {
      if (store.currentIndex < store.allChapters.length - 1) {
        store.nextChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      } else if (store.currentType !== 'intro') {
          store.resetToIntro();
          router.push({ name: 'Chapter', params: { index: store.lastIntroIndex.toString() } });
      }
    }

    function prevChapter() {
      if (store.currentIndex > 0) {
        store.prevChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      }
    }

    function navigateToReferences() {
      store.navigateToReferences();
      router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
    }

    function navigateToStart() {
      store.currentIndex = 0;
      store.currentType = 'intro';
      router.push({ name: 'Chapter', params: { index: '0' } });
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

    const referencesButtonStyle = {
      color: 'black'
    };

    const introButtonStyle = {
      color: 'black'
    };

    return {
      store,
      currentChapter,
      nextChapter,
      prevChapter,
      imageStyle,
      isLastIntroChapter,
      isReferencesChapter,
      navigateToReferences,
      navigateToStart,
      prevButtonStyle,
      nextButtonStyle,
      referencesButtonStyle,
      introButtonStyle,
      mobileView
    };
  }
};
</script>

<style scoped>

  #grid-container-viz {
    display: grid;
    width: 100%;
    margin: 0 auto 0 auto;
    grid-template-columns: 1fr 80% 1fr;
    column-gap: 2%;
    grid-template-rows: max-content auto 9vh max-content;
    row-gap: 2vh;
    grid-template-areas:
      "title title title"
      "image image image"
      "prev text next"
      "start text end";
    justify-content: center;
    @media screen and (max-height: 770px) {
      grid-template-rows: max-content auto 15vh max-content;
    }
    @media screen and (max-width: 600px) {
      column-gap: 5%;
      grid-template-rows: max-content auto minmax(18vh, max-content) max-content max-content;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: 
        "title title"
        "image image"
        "text text"
        "prev next"
        "start end"
      ;
    }
  }
  #page-title {
    grid-area: title;
    margin: 0 auto;
  }
  #chapter-text {
    grid-area: text;
    justify-self: center;
  }
  #images-container {
    grid-area: image;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  #prev-button {
    grid-area: prev;
    align-self: start;
  }
  #next-button {
    grid-area: next;
    align-self: start;
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
    grid-area: image;
    min-height: 567px; /* to match img */
    @media screen and (max-height: 770px) {
      min-height: auto;
    }
  }

#images-container img {
  max-width: 100%;
  max-height: 562.5px; /* height of 16:9 image w/ max-width = 1000px */
  object-fit: contain;
  @media screen and (max-height: 770px) {
    max-height: 60vh;
  }
  @media screen and (max-width: 600px) {
    height: 30vh;
  }
}

.choose-adventure {
  justify-content: center;
  display: flex;
  gap: 20px;
  margin-top: 1rem;
}
</style>

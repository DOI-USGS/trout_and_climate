<template>
  <div id="grid-container-viz" class="home">
    <h1 id="page-title">Mangaging Redband Trout for climate resilience</h1>
    <div id="chapter-text" v-if="currentChapter">
      <p >{{ currentChapter.text }}</p>
    </div>
    <div v-if="!isReferencesPage" id="images-container" >
      <img :src="currentChapter.bknd" :alt="currentChapter.alt || 'Chapter Image'" />
    </div>
    <ReferencesSection v-if="isReferencesPage" />
    <RetroButton
      id = "prev-button"
      label="&#8249;"
      :buttonStyle="prevButtonStyle"
      @click="prevChapter"
      :isDisabled="isFirstPage"
    />
    <RetroButton
      id = "next-button"
      v-if="!isReferencesPage"
      label="&#8250;"
      :buttonStyle="nextButtonStyle"
      @click="nextChapter"
      :isDisabled="isReferencesPage"
    />
<!--     <RetroButton
      id = "start-button"
      label="Restart"
      :buttonStyle="introButtonStyle"
      @click="navigateToStart"
      :isDisabled="isFirstPage"
    /> -->
<!--     <RetroButton
      id = "end-button"
      v-if="!isReferencesPage"
      label="References"
      :buttonStyle="referencesButtonStyle"
      @click="navigateToReferences"
      :isDisabled="isReferencesPage"
    /> -->
    <br>
  </div>
  <br>
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

    const isReferencesPage = computed(() => {
      return store.currentIndex === store.allChapters.length -1;
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

    function navigateToReferences() {
      store.currentIndex = store.allChapters.length -1;
      router.push({ name: 'Chapter', params: { index: '20' } });
    }

    function navigateToStart() {
      store.currentIndex = 0;
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
      isReferencesPage,
      isFirstPage,
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
    height: 90vh;
    grid-template-columns: 1fr 80% 1fr;
    column-gap: 0;
    grid-template-rows: max-content auto 1fr;
    row-gap: 2vh;
    grid-template-areas:
      "title title title"
      "image image image"
      "prev text next";
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
  max-height: 100%;
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

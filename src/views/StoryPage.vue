<template>
  <div id="grid-container-viz" class="home">
    <h1 id="page-title">Mangaging Redband Trout for climate resilience</h1>
    <div id="images-container" >
      <img :src="currentChapter.bknd" :alt="currentChapter.alt || 'Chapter Image'" />
    </div>

    <!-- Desktop Layout: Buttons on either side of text -->
    <div v-if="!mobileView" id="chapter-content-desktop">
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
        :isDisabled="isLastPage"
        :style="{ visibility: isLastPage ? 'hidden' : 'visible' }"
      />
    </div>

    <!-- Mobile Layout: Buttons below text -->
    <div v-else id="chapter-content-mobile">
      <div id="chapter-text" v-if="currentChapter">
        <p v-html="currentChapter.text"></p>
      </div>
      <div id="button-container-mobile">
      <RetroButton
        id = "prev-button"
        label="&#8249;"
        :buttonStyle="prevButtonStyle"
        @click="prevChapter"
        :isDisabled="isFirstPage"
        :style="{ visibility: isFirstPage ? 'hidden' : 'visible' }"
      />
      <RetroButton
        id = "next-button"
        label="&#8250;"
        :buttonStyle="nextButtonStyle"
        @click="nextChapter"
        :isDisabled="isLastPage"
        :style="{ visibility: isLastPage ? 'hidden' : 'visible' }"
      />
      </div>
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
      <p>
        This site was created by the <a href='https://labs.waterdata.usgs.gov/visualizations/'>USGS Vizlab</a>. The content was inspired by USGS data releases and publications by <a href='https://www.usgs.gov/staff-profiles/jason-b-dunham'>Jason Dunham</a> and <a href='https://www.usgs.gov/staff-profiles/joseph-r-benjamin'>Joseph Benjamin</a>. Leo Ivey and <a href='https://www.usgs.gov/index.php/staff-profiles/althea-a-archer'>Althea Archer</a> developed the data visualizations, illustrations, and storyline as part of an internship through the <a href='https://www.usgs.gov/youth-and-education-in-science/cooperative-summer-fellowship-programs'>USGS YES Cooperative Summer Fellowship Program</a>. <a href='https://www.usgs.gov/staff-profiles/cee-nell'>Cee Nell</a> and <a href='https://www.usgs.gov/staff-profiles/hayley-corson-dosch'>Hayley Corson-Dosch</a> created the website. 
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
      isLastPage,
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
}
#chapter-content-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#button-container-mobile {
  display: flex;
  width: 100%;
  justify-content: space-between; 
}
#prev-button-mobile, #next-button-mobile {
  width: 50%;
  height: auto;
  font-size: 3rem;
}
#chapter-text {
  flex-grow: 1; 
  display: flex;
  align-items: center;
  justify-self: center;
  padding: 0 20px;
}
#prev-button, #next-button {
  font-size: 6rem; 
  background-color: white;
  border: none;
  width: 100px; 
  min-width: 100px;
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
#references {
  margin-top: 20px;
}
#images-container {
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 20px;
}
#images-container img {
  max-width: 100%;
  max-height: 562.5px;
  object-fit: contain;
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
}

/* Mobile-specific styles */
@media screen and (max-width: 600px) {
  #chapter-content {
    flex-direction: column;
    align-items: center;
  }
  #chapter-title {
    line-height: 1.2rem;
  }
  #chapter-text {
    width: 100%; 
    padding: 10px;
  }
  #images-container {
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 5px;
  }
  #button-container-mobile {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}
</style>

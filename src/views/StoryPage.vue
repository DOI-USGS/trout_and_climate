<template>
  <div class="home">
    <h1>Trout and Climate</h1>
    <div v-if="currentChapter" class="chapter-container">
      <h2>{{ currentChapter.text }}</h2>
      <div class="images-container" :style="{ backgroundImage: `url(${currentChapter.bknd})` }">
        <div v-for="image in currentChapter.images" :key="image.src" :style="imageStyle(image)">
          <img v-if="image.src" :src="image.src" :alt="image.alt || 'Chapter Image'" />
        </div>
      </div>
      <div class="navigation-buttons">
        <RetroButton
          label="Previous"
          :buttonStyle="prevButtonStyle"
          @click="prevChapter"
          :isDisabled="store.currentIndex <= 0"
        />
        <RetroButton
          v-if="store.currentIndex < store.allChapters.length"
          label="Next"
          :buttonStyle="nextButtonStyle"
          @click="nextChapter"
          :isDisabled="isLastIntroChapter || isLastOutroChapter"
        />
      </div>
      <div v-if="isLastIntroChapter" class="choose-adventure">
        <RetroButton
          label="Hot"
          :buttonStyle="chooseButtonStyle"
          @click="chooseAdventure('hotWater')"
          :isDisabled="store.selectedOptions.includes('hotWater')"
        />
        <RetroButton
          label="Warm"
          :buttonStyle="chooseButtonStyle"
          @click="chooseAdventure('warmWater')"
          :isDisabled="store.selectedOptions.includes('warmWater')"
        />
        <RetroButton
          label="Cold"
          :buttonStyle="chooseButtonStyle"
          @click="chooseAdventure('coldWater')"
          :isDisabled="store.selectedOptions.includes('coldWater')"
        />
      </div>
      <RetroButton
        label="Go to end"
        :buttonStyle="outroButtonStyle"
        @click="navigateToOutro"
        :isDisabled="isLastOutroChapter || store.currentIndex <= 0"
      />
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from '@/stores/index.js';
import RetroButton from '@/components/RetroButton.vue';

export default {
  components: {
    RetroButton
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

    const currentChapter = computed(() => {
      return store.allChapters[store.currentIndex];
    });

    const isLastIntroChapter = computed(() => {
      return store.currentType === 'intro' && store.currentIndex === store.lastIntroIndex;
    });

    const isOutroChapter = computed(() => {
      return store.currentType === 'outro';
    });

    const isLastOutroChapter = computed(() => {
      return store.currentType === 'outro' && store.currentIndex === store.allChapters.length - 1;
    });

    function nextChapter() {
      if (store.currentIndex < store.allChapters.length - 1) {
        store.nextChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      } else if (store.currentType !== 'intro') {
        if (store.allOptionsChosen()) {
          store.navigateToOutro();
          router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
        } else {
          store.resetToIntro();
          router.push({ name: 'Chapter', params: { index: store.lastIntroIndex.toString() } });
        }
      }
    }

    function prevChapter() {
      if (store.currentIndex > 0) {
        store.prevChapter();
        router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
      }
    }

    function chooseAdventure(newType) {
      store.selectedOptions.push(newType);
      const nextIndex = store.allChapters.length;
      store.setTypeAndIndex(newType, nextIndex);
      router.push({ name: 'Chapter', params: { index: nextIndex.toString() } });
    }

    function navigateToOutro() {
      store.navigateToOutro();
      router.push({ name: 'Chapter', params: { index: store.currentIndex.toString() } });
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
      backgroundColor: '#00264c'
    };

    const nextButtonStyle = {
      backgroundColor: '#00264c'
    };

    const outroButtonStyle = {
      backgroundColor: '#00264c'
    };

    const chooseButtonStyle = {
      backgroundColor: '#d66853'
    };

    return {
      store,
      currentChapter,
      nextChapter,
      prevChapter,
      imageStyle,
      isLastIntroChapter,
      isOutroChapter,
      isLastOutroChapter,
      chooseAdventure,
      navigateToOutro,
      prevButtonStyle,
      nextButtonStyle,
      outroButtonStyle,
      chooseButtonStyle
    };
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
}

.chapter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
}

.images-container {
  position: relative;
  width: 100%;
  height: 70%; /* Adjust as needed */
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.images-container img {
  display: block;
  max-width: 100%;
  max-height: 100%;
}

.navigation-buttons {
  position: absolute;
  bottom: 20px; /* Adjust as needed */
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.choose-adventure {
  display: flex;
  gap: 10px;
}

.navigation-buttons RetroButton {
  flex: 1;
  margin: 0 10px;
}

</style>

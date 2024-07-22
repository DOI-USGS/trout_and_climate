<template>
  <div class="app-container">
    <WindowSize v-if="typeOfEnv === '-test build-'" />
    <HeaderUSWDSBanner v-if="typeOfEnv !== '-test build-'" />
    <HeaderUSGS />
    <WorkInProgressWarning v-if="typeOfEnv === '-beta build-'" />
    <div class="content-container">
      <RouterView />
    </div>
    <FooterUSGS />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterView } from 'vue-router'
import WindowSize from "./components/WindowSize.vue";
import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue";
import HeaderUSGS from './components/HeaderUSGS.vue';
import WorkInProgressWarning from "./components/WorkInProgressWarning.vue";
import FooterUSGS from './components/FooterUSGS.vue';
import { useWindowSizeStore } from './stores/WindowSizeStore';

const windowSizeStore = useWindowSizeStore();
const typeOfEnv = import.meta.env.VITE_APP_TIER;

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

function handleResize() {
  windowSizeStore.windowWidth = window.innerWidth;
  windowSizeStore.windowHeight = window.innerHeight;
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;500;600;700;800&display=swap');
$SourceSans: 'Source Sans Pro', sans-serif;
$textcolor: #7d4e57;
$linkcolor: #d66853;

html, body, #app, .app-container {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: $SourceSans;
}

.app-container {
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

header, footer {
  flex-shrink: 0;
}
</style>

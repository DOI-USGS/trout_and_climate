<template>
  <div class="app-container">
    <WindowSize v-if="typeOfEnv === '-test build-'" />
    <HeaderUSWDSBanner v-if="typeOfEnv !== '-test build-'" />
    <HeaderUSGS />
    <WorkInProgressWarning v-if="typeOfEnv !== ''" />
    <div class="content-container" :class="{ mobile: mobileView}">
      <RouterView />
    </div>
    <PreFooterCodeLinks :gitHubRepositoryLink="gitHubRepositoryLink"/>
    <FooterUSGS />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { RouterView } from 'vue-router'
import { isMobile } from 'mobile-device-detect';
import WindowSize from "./components/WindowSize.vue";
import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue";
import HeaderUSGS from './components/HeaderUSGS.vue';
import WorkInProgressWarning from "./components/WorkInProgressWarning.vue";
import PreFooterCodeLinks from "@/components/PreFooterCodeLinks.vue";
import FooterUSGS from './components/FooterUSGS.vue';
import { useWindowSizeStore } from './stores/WindowSizeStore';

const windowSizeStore = useWindowSizeStore();
const typeOfEnv = import.meta.env.VITE_APP_TIER;
const mobileView = isMobile;
const gitHubRepositoryLink = import.meta.env.VITE_APP_GITHUB_REPOSITORY_LINK;

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  windowSizeStore.windowWidth = window.innerWidth;
  windowSizeStore.windowHeight = window.innerHeight;
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Skranji:wght@400;700&display=swap');
$SourceSans: 'Source Sans Pro', sans-serif;
$Skranji: 'Skranji', system-ui;
$textcolor: #7d4e57;
$linkcolor: #d66853;

html, body, #app, .app-container {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: $SourceSans;
}

.content-container {
  min-width: 720px;
  max-width: 1000px;
  min-height: calc(100vh - 20.4px - 85.67px - 32px - 92.33px - 2rem); /* page height - USWDS banner - USGS header - prefooter code links - USGS footer - container margin (top + bottom) */
  margin: 1rem auto;
  padding-top: 5rem;
  @media screen and (max-height: 770px) {
    padding-top: 0rem;
  }
  @media screen and (max-width: 600px) {
    min-height: auto;
    min-width: 95%;
    max-width: 95%;
    padding-top: 0rem;
  }
}
</style>

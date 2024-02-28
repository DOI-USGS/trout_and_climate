<template>
  <div>
    <WindowSize v-if="typeOfEnv === '-test build-'" />
    <HeaderUSWDSBanner v-if="typeOfEnv !== '-test build-'" />
    <HeaderUSGS />
    <WorkInProgressWarning v-if="typeOfEnv === '-beta build-'" />
    <RouterView />
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

  // Declare behavior on mounted
  // functions called here
  onMounted(() => {
    // Add window size tracking by adding a listener
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  // Functions
  function handleResize() {
    // store the window size values in the Pinia state
    windowSizeStore.windowWidth = window.innerWidth;
    windowSizeStore.windowHeight = window.innerHeight;
  }
</script>

<style lang="scss">
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;500;600;700;800&display=swap');
$SourceSans: 'Source Sans Pro', sans-serif;
$textcolor: #7d4e57;
$linkcolor: #d66853;

html {
  /* Make base font-size 100% of browser font-size */
  font-size: 100%;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth; 
  }
}

img {
  /* For responsive images that adjust & adapt */
  height: auto;
  max-width: 100%;
  user-select: none;
}

button {
  color: inherit; 
}

a, button {
  touch-action: manipulation; /* Element doesn't want double-tap on mobile to zoom */
}

svg {
  /* SVGs fit the parent container by default */
  height: 100%;
  width: 100%;
  fill: currentColor;
}

iframe, video {
  /* Make iframes & videos fit the parent container by default */
  height: 100%;
  width: 100%
}

body {
      height: 100%;
      background-color: white;
      margin: 0;
      padding: 0;
      line-height: 1.2;
      font-size: 1.95rem;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 100%;
      @media screen and (max-width: 600px) {
        font-size: 1.6rem;
      }
  }
h1{
  font-size: 4.5rem;
  font-weight: 500;
  font-family: $SourceSans;
  line-height: 1;
  text-align: left;
  text-shadow: 1px 1px 100px rgba(0,0,0,.8);
    color: $textcolor;
  @media screen and (max-width: 600px) {
    font-size: 4.75rem;
  }
}
h2{
  font-weight: 700;
  text-align: left;
  font-family: $SourceSans;
  font-size: 6rem;
  margin-top: 5px;
  line-height: 1.2;
  color: $textcolor;
  @media screen and (max-width: 600px) {
    font-size: 4rem;
    line-height: 1.1;
  }
}
h3{
  font-size: 3.5rem;
  padding-top: 1em;
  padding-bottom: .25em;
  font-family: $SourceSans;
  font-weight: 700;
  color: $textcolor;
  @media screen and (max-width: 600px) {
      font-size: 3.2rem;
  }  
}
h4{
  font-size: 2.5rem;
  padding-top: 0em;
  padding-bottom: .25em;
  font-family: $SourceSans;
  font-weight: 600;
  color: $textcolor;
  @media screen and (max-width: 600px) {
    font-size: 1.8rem;
  }  
}
p, text {
  // padding: 1em 0 0 0; 
  font-family: $SourceSans;
  color: $textcolor;
}
a:link {
  color:#032a56;
}
a:visited {
  color: #032a56;
}
a:hover {
  color: #032a56;
}
a:active {
  color: #032a56;
}
button {
  align-items: center;
  background-color: $linkcolor;
  border: 2px solid hsl(0, 0%, 7%);
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  height: 48px;
  justify-content: center;
  max-width: 100%;
  padding: 0 15px;
  position: relative;
  font-weight: 800;
  text-align: center;
  touch-action: manipulation;
}

button:after {
  background-color: #111;
  border-radius: 8px;
  content: '';
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

button:hover:after {
  transform: translate(0, 0);
}

button:active {
  background-color: $linkcolor;
  outline: 0;
}

button:hover {
  outline: 0;
}
</style>

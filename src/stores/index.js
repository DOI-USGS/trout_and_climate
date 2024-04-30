  import chaptersData from '@/assets/content.json';// src/store.js
  import { reactive } from 'vue';
  
  export const store = reactive({
    chapters: chaptersData.intro.concat(chaptersData.hotWater, chaptersData.warmWater, chaptersData.coldWater) // Combining all chapters into one array
});
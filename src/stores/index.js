// store/index.js
import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  chapters: content.intro,
  hotWaterChapters: content.hotWater,
  warmWaterChapters: content.warmWater,
  coldWaterChapters: content.coldWater,
  // You can add more categories if needed
});

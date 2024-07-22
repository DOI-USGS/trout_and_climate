import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  intro: content.intro,
  hotWater: content.hotWater,
  warmWater: content.warmWater,
  coldWater: content.coldWater,
  allChapters: [],
  currentType: 'intro',
  currentIndex: 0,
  selectedOptions: [],
  lastIntroIndex: content.intro.length - 1,
  
  initializeAllChapters() {
    this.allChapters = [...this.intro];
  },
  
  addChapters(type) {
    const newChapters = this[type].map((chapter, index) => {
      return { ...chapter, globalIndex: this.allChapters.length + index };
    });
    this.allChapters.push(...newChapters);
  },
  
  setTypeAndIndex(newType, newIndex) {
    this.currentType = newType;
    this.currentIndex = newIndex;
    if (newType !== 'intro') {
      this.addChapters(newType);
    }
  },
  
  nextChapter() {
    if (this.currentIndex < this.allChapters.length - 1) {
      this.currentIndex++;
    } else if (this.currentType !== 'intro') {
      this.resetToIntro();
    }
  },
  
  prevChapter() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  },
  
  resetToIntro() {
    this.currentType = 'intro';
    this.currentIndex = this.lastIntroIndex;
  }
});

// Initialize allChapters on store load
store.initializeAllChapters();

import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  intro: content.intro,
  hotWater: content.hotWater,
  warmWater: content.warmWater,
  coldWater: content.coldWater,
  outro: content.outro || [],
  allChapters: [],
  currentType: 'intro',
  currentIndex: 0,
  selectedOptions: [],
  lastIntroIndex: content.intro.length - 1,

  initializeAllChapters() {
    this.allChapters = [...this.intro];
  },
  
  addChapters(type) {
    const newChapters = this[type]?.map((chapter, index) => {
      return { ...chapter, globalIndex: this.allChapters.length + index };
    }) || [];
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
      if (this.allOptionsChosen()) {
        this.navigateToOutro();
      } else {
        this.resetToIntro();
      }
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
  },

  allOptionsChosen() {
    return this.selectedOptions.length === 3;
  },

  navigateToOutro() {
    const outroStartIndex = this.allChapters.length;
    const outroChapters = this.outro.map((chapter, index) => {
      return { ...chapter, globalIndex: outroStartIndex + index };
    });
    this.allChapters.push(...outroChapters);
    this.currentType = 'outro';
    this.currentIndex = outroStartIndex;
  }
});

// Initialize allChapters on store load
store.initializeAllChapters();

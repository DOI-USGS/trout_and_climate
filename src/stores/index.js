import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  intro: content.intro,
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
    if (this.currentIndex < this.allChapters.length) {
      this.currentIndex++;
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

  navigateToReferences() {
    const referencesStartIndex = this.allChapters.length;
    const referencesChapter = this.outro.map((chapter, index) => {
      return { ...chapter, globalIndex: referencesStartIndex + index };
    });
    this.allChapters.push(...referencesChapter);
    this.currentType = 'outro';
    this.currentIndex = referencesStartIndex;
  }
});

// Initialize allChapters on store load
store.initializeAllChapters();

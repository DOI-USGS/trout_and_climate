import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  intro: content.story,
  allChapters: [],
  currentType: 'intro',
  currentIndex: 0,
  selectedOptions: [],

  initializeAllChapters() {
    this.allChapters = [...this.intro];
  },
  
  addChapters(type) {
    const newChapters = this[type]?.map((chapter, index) => {
      return { ...chapter, globalIndex: this.allChapters.length + index };
    }) || [];
    this.allChapters.push(...newChapters);
  },

  setIndex(newIndex) {
    this.currentIndex = newIndex;
    if (currentIndex = this.allChapters.length) {
      currentType = 'references'
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

  navigateToReferences() {
    const referencesStartIndex = this.allChapters.length;
    const referencesChapter = this.intro.map((chapter, referencesStartIndex) => {
      return { ...chapter, globalIndex: referencesStartIndex };
    });
    this.allChapters.push(...referencesChapter);
    this.currentType = 'references';
    this.currentIndex = referencesStartIndex;
  }
});

// Initialize allChapters on store load
store.initializeAllChapters();

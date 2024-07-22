// store/index.js
import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  chapters: content.intro,
  currentType: 'intro',
  currentIndex: 0,
  selectedOptions: [],
  setTypeAndIndex(newType, newIndex) {
    this.currentType = newType;
    this.currentIndex = newIndex;
    this.chapters = content[newType];
  },
  nextChapter() {
    if (this.currentIndex < this.chapters.length - 1) {
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
    this.currentIndex = content.intro.length - 1;
    this.chapters = content.intro;
  }
});

import { reactive } from 'vue';
import content from '@/assets/content.json';

export const store = reactive({
  chapters: content.intro,
  currentType: 'intro',
  currentIndex: 0,
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
  }
});
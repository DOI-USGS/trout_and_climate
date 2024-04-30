
<template>
    <div>
        <h1>{{ chapterData.id }}</h1>
        <p>{{ chapterData.text }}</p>
        <button v-if="nextChapter" @click="goToNextChapter">Next</button>
        <div v-for="image in chapterData.images" :key="image.src" :style="{ backgroundImage: 'url(' + image.src + ')', position: 'absolute', top: image.y, left: image.x, width: image.width }">
    </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores/index.js';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const chapters = store.chapters; 
        const chapterData = computed(() => {
            return chapters.find(chapter => chapter.id === route.params.chapterId);
            console.log('Chapters:', store.chapters);
        });
        const nextChapter = computed(() => {
        const currentIndex = chapters.indexOf(chapterData.value);
            return chapters[currentIndex + 1] || null;
        });

        const goToNextChapter = () => {
            if (nextChapter.value) {
                router.push(`/${nextChapter.value.id}`);
            }
        };
    return { chapters, chapterData, nextChapter, goToNextChapter }
    }
}
</script>

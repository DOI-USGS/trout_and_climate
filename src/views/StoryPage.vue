
<template>
    <div>
        <h1>{{ chapter.title }}</h1>
        <p>{{ chapter.content }}</p>
        <button v-if="nextChapter" @click="goToNextChapter">Next</button>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const chapters = this.$root.chapters; 
        const chapterData = computed(() => {
            return chapters.find(chapter => chapter.id === route.params.chapterId);
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
    return { chapterData, nextChapter, goToNextChapter }
    }
}
</script>

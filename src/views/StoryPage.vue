
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
import { nextTick } from 'vue';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const chapter = computed(() => {
            const chapterId = route.params.chapter
            // Fetch or compute chapter data based onchapterId
            return fetchChapterData(chapterId)
        })
        const nextChapter = computed(() => {
            // Determine next chapter based on current
            returndetermineNextChapter(chapter.value.id)
        })
        function goToNextChapter() {
            router.push(`/${nextChapter.value}`)
        }
        function fetchChapterData(chapterId) {
      // Placeholder for fetching chapter data
      return {
        id: chapterId,
        title: `Chapter ${chapterId}`,
        content: `Content of Chapter ${chapterId}`
      }
    }

    function determineNextChapter(currentChapterId) {
      // Example logic to find next chapter
      return parseInt(currentChapterId) + 1
    }

    return { chapter, nextChapter, goToNextChapter }
    }
}
</script>

<template>
  <section id="references">
    <div class="text-container title-text">
      <h2>{{ text.title }}</h2>
    </div>
    <div class="text-container">
      <div v-for="reference in text.references" :key="reference.subTitle">
        <p id="reference-text">
          <span v-html="reference.authors"></span>,
          <span v-html="reference.year"></span>,
          <a :href="reference.link" target="_blank"><span v-html="reference.title"></span></a
          ><span v-if="reference.type != ''">, </span><span v-html="reference.type"></span><span
            v-if="reference.ref != ''"
            >, </span
          ><span v-html="reference.ref"></span>.
        </p>
        <br />
      </div>
    </div>
  </section>
</template>

<script>
import referencesText from '@/assets/text/referencesText';

export default {
  name: 'ReferencesSection',

  setup() {
    const text = referencesText.referencesContent;

    const sortReferences = () => {
      if (text.references && Array.isArray(text.references)) {
        text.references.sort((a, b) => a.authors.localeCompare(b.authors));
      }
    };

    const sortedText = sortReferences(text);

    return {
      text  
    };
  }
};
</script>

<style scoped lang="scss">
p {
  font-size: 2rem;
  padding: 0 10px;
}
</style>

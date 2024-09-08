<template>
  <section id="references">
    <div class="text-container title-text">
      <h3>{{ text.title }}</h3>
    </div>
    <div class="text-container">
      <div v-for="reference in text.references" :key="reference.subTitle">
        <p id="reference-text">
          <span v-html="reference.num"></span>. <span v-html="reference.authors"></span>,
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
  data() {
    return {
      text: referencesText.referencesContent
    };
  }
};
</script>

<style scoped lang="scss">
button:not([disabled]):focus {
  outline: none;
}
#reference-text{
  font-size: 1.7rem;
}
</style>

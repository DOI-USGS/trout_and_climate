<template>
  <section>
    <div class="parent-container">
   <Wavy />
  </div>
  </section>
</template>

<script setup>
  import Wavy from '../components/Content.vue';
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}
.parent-container {
  width: 100vw; /* Set the width to 100% of the viewport width */
  height: 100vh; /* Set the height to 100% of the viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
}


</style>
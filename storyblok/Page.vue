<script setup lang="ts">
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="pt-22">
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>

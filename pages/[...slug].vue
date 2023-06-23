<script setup lang="ts">
const route = useRoute()
const story = await useAsyncStoryblok(route.params.slug.join('/'), { version: 'draft' })
</script>
<template>
  <pre>{{ story }}</pre>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>

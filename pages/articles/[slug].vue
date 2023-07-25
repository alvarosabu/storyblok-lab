<script setup lang="ts">
import { RichTextRenderer } from '@marvr/storyblok-rich-text-vue-renderer'

import { renderRichText, RichTextSchema } from '@storyblok/vue';
const route = useRoute()
console.log(route)
const story = await useAsyncStoryblok(route.path, { version: 'draft' })
console.log(story)

/* const articleContent = computed(() => {
  return renderRichText(story.value.content?.content, {
    schema: RichTextSchema,
    resolver: (component, blok) => {
        switch (component) {
          case "youtube-embed":
            return `<video :blok="${blok}" />`;
          default:
            return "Resolver not defined";
        }
      }
  })
}) */

</script>
<template>
  <main class="container mx-auto pt-24">
    <h1>{{ story.content.title }}</h1>
<!--     <div v-html="articleContent" /> -->
   <RichTextRenderer :document="story?.content.content" />
  </main>
</template>

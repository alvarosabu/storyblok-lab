<script lang="ts" setup>
defineProps({
  blok: Object,
})
</script>
<template>
    {{ blok.videoId }}
  <lite-youtube
    v-if="blok"
    rounded-lg
    :videoid="blok.videoId"
    :playlabel="blok.title"
    params="controls=1&start=0&end=30&modestbranding=2&rel=0&enablejsapi=1"
  />
</template>
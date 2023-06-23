<script setup lang="ts">
import sdk from '@stackblitz/sdk'

const embed = ref(null)

const props = defineProps({
  blok: Object,
})

watchEffect(() => {
  if (embed.value) {
    embed.value.appendChild(document.createElement('div'))

    sdk.embedProjectId(embed.value.children[0], props.blok.project_id, {
      openFile: props.blok.open_file,
      view: props.blok.is_preview ? 'preview' : 'editor',
    })
  }
})
</script>
<template>
  <div ref="embed"></div>
</template>

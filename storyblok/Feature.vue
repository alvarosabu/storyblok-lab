<script setup lang="ts">
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="py-32 text-6xl text-[#50b0ae]">
    <h1>{{ blok.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

let props = defineProps<{
  isFullscreenLoader: boolean
}>()
</script>

<template>
  <div
    class="spinner-border text-dark mx-auto"
    :class="{'spinner-fullscreen' : isFullscreenLoader}"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style scoped lang="scss">
.spinner-fullscreen {
  position: absolute;
  top: 50%;
}
</style>

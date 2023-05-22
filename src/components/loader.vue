<script setup lang="ts">
import {defineProps} from 'vue'

defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (value: string) => {
      return ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].includes(value)
    }
  },
  isFullscreenLoader: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="spinner-border mx-auto"
    :class="[
      {'spinner-fullscreen' : isFullscreenLoader},
      `text-${color}`
      ]"
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

<script setup lang="ts">

import TextWriteWindow from "@/components/TestWriteInput/TextWriteWindow.vue";

let textFromApi = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non augue. "
</script>

<template>
  <div class="home">
    <TextWriteWindow :text="textFromApi.trim().split('')"></TextWriteWindow>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

import TextWriteWindow from "@/components/TestWriteInput/TextWriteWindow.vue";

import FishText from '@/views/api'

let textFromApi = ref('')
let isLoading = ref(true)


onMounted(() => {
  FishText.getFishTextRu({
    type: 'sentence',
    number: '5',
    format: 'json'
  })
    .then(({data}) => {
      if (data.status !== 'success') {
        console.error('Ошибка получения данных')
        return
      }

      textFromApi.value = data.text
    })
    .finally(() => {
      isLoading.value = false
    })
    .catch((err) => console.error('Ошибка: ', err))
})
</script>

<template>
  <div class="w-100">
    <TextWriteWindow
      :text="textFromApi.trim().split('') "
      :is-loading="isLoading"
    />
  </div>
</template>

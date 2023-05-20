<script setup lang="ts">
import {ref} from "vue";

import TextWriteWindow from "@/components/TestWriteWindow/TextWriteWindow.vue";

import FishText from '@/views/api'
import FormConstruct from "@/components/form-construct.vue";
import {formDataFishTextRu, formDataFishTextEn, formDataAfterSend} from "@/types/formData";

let textFromApi = ref('')
let isLoading = ref(true)
let isShowForm = ref(true)

function getText(data: formDataAfterSend) {
  isShowForm.value = false
  if (data.lang === 'Ru') {
    const formData: formDataFishTextRu = {
      type: 'sentence',
      number: data.countOfsentence,
      format: 'json'
    }

    FishText.getFishTextRu(formData)
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

    return
  }

  const formData: formDataFishTextEn = {
    type: "all-meat",
    sentences: data.countOfsentence
  }

  FishText.getFishTextEn(formData)
    .then(({data}) => {
      textFromApi.value = data[0]
    })
    .finally(() => {
      isLoading.value = false
    })
    .catch((err) => console.error('Ошибка: ', err))
}

</script>

<template>
  <div class="test-page">
    <form-construct
      v-if="isShowForm"
      class="modal-setup"
      @send-data="getText"
    />
    <TextWriteWindow
      v-else
      :text="textFromApi.trim().split('') "
      :is-loading="isLoading"
    />
  </div>
</template>

<style lang="scss">
.test-page {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-setup {
  padding: 15px 30px;
  background: var(--bs-gray-600);
  border-radius: 10px;
}
</style>

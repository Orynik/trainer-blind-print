<script setup lang="ts">
import FishText from '@/views/api'

import {ref} from "vue";

import TextWriteWindow from "@/components/TestWriteWindow/TextWriteWindow.vue";
import FormConstruct from "@/components/formConstruct/formConstruct.vue";
import {formSchemaType} from '@/components/formConstruct/formConstructor'

import {formDataFishTextRu, formDataFishTextEn} from "@/types/formData";
import {between, maxValue, numeric, required} from "@vuelidate/validators";

const isLang = (val: string) => ['Ru', 'En'].includes(val)

const formSchema: Array<formSchemaType> = [
  {
    name: 'lang',
    label: 'Выберите язык',
    type: 'select',
    placeholder: 'Количество предложений',
    default: '',
    options: {
      selectData: [
        {
          label: 'Ru',
          value: 'Ru'
        },
        {
          label: 'En',
          value: 'En'
        }
      ]
    }
  },
  {
    name: 'sentences',
    type: 'input',
    label: 'Количество предложений',
    default: '',
  }
]

const formValidation: object = {
  lang: {required, isLang},
  sentences: {maxValue, numeric, betweenValue: between(1, 15), required},
}

let textFromApi = ref('')
let isLoading = ref(true)
let isShowForm = ref(true)

function getText(data: { lang: string, sentences: string }) {
  isShowForm.value = false
  if (data.lang === 'Ru') {
    const formData: formDataFishTextRu = {
      type: 'sentence',
      number: data.sentences,
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
    sentences: data.sentences
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

function backToForm() {
  isShowForm.value = true
  isLoading.value = true
}

</script>

<template>
  <div class="test-page">
    <form-construct
      v-if="isShowForm"
      :form-schema="formSchema"
      :form-validation="formValidation"
      class="modal-setup"
      @send-data="getText"
    />
    <TextWriteWindow
      v-else
      :text="textFromApi.trim().split('') "
      :is-loading="isLoading"
      @backToForm="backToForm"
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
  color: var(--bs-white);
  background: var(--bs-gray-700);
  border-radius: 10px;
}
</style>

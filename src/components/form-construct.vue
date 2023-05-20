<script setup lang="ts">

import {reactive, defineEmits} from "vue";

import {formDataAfterSend} from "@/types/formData";

const emit = defineEmits<{
  (e: 'sendData', data: formDataAfterSend): void
}>()

let formData = reactive({
  lang: 'Ru',
  countOfsentence: 5
})

function sendData() {
  emit('sendData', formData)
}
</script>

<template>
  <form>
    <h3 class="mx-5">Слепая печать</h3>

    <div class="input-group mb-3">
      <select class="form-select" required aria-label="select example" v-model="formData.lang">
        <option selected>Выберите язык:</option>
        <option value="Ru">Ru</option>
        <option value="En">En</option>
      </select>
    </div>

    <div class="input-group mb-3">
      <input v-model="formData.countOfsentence" type="number" class="form-control" placeholder="Количество предложений"
             aria-describedby="basic-addon2">
    </div>

    <div class="mb-3">
      <button class="btn btn-primary" type="button" @click="sendData">Выбрать</button>
    </div>
  </form>
</template>

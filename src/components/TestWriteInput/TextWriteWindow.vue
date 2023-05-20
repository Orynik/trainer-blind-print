<script setup lang="ts">
import {computed, defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import TextWriteInput from "@/components/TestWriteInput/TextWriteRender.vue";

import {startStopwatch, stopStopwatch, timeInMinute} from "@/components/_composibles/stopwatch"

let props = defineProps<{
  text: string[],
  isLoading: boolean
}>()

// Обработка нажатого символа
let indexCurrentChar = ref(0)
let invalidChar = ref(false)
let computedCurrentChar = computed(() => {
  return props.text[indexCurrentChar.value]
})
let errorCounter = ref(0)

const listServiceKeys = ['shift', 'capslock', 'enter', 'control', 'alt', 'backspace']

function onKeyupKeyboard(e: KeyboardEvent) {
  // TODO: Исправить TS, чтобы не выдвал ошибку на array.prototype.at
  if (indexCurrentChar.value >= props.text.length - 1) {
    //TODO: Модалка либо редирект на страницу с результатами тестирования
    stopStopwatch()
  }

  let isServiceKey = !!~listServiceKeys.findIndex((key) => e.key.toLowerCase() === key)
  if (isServiceKey) return

  if (e.key != computedCurrentChar.value) {
    invalidChar.value = true
    errorCounter.value++
    return
  }

  invalidChar.value = false

  //TODO: Добавить доп обработку скорости ввода и тд

  indexCurrentChar.value++
}

// Конец обработки нажатия

// Хуки
onMounted(() => {
  document.addEventListener('keydown', onKeyupKeyboard)
  startStopwatch()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyupKeyboard)
})

// Расчет скорости ввода

const charPerMin = computed(() => {
  let value: number = +indexCurrentChar.value / timeInMinute.value
  return value.toFixed()
})

// Конец расчета скорости ввода

// Расчет точности вводимой информации

const accuracyWriting = computed(() => {
  return (100 - (errorCounter.value * 100) / props.text.length).toFixed(1)
})

// Конец расчета очности вводимой информации

</script>

<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else>
      <span>Аккуратность,% : {{ accuracyWriting }} %</span>
      <br>
      <span>Сим/м: {{ charPerMin }}</span>
      <div @keydown="onKeyupKeyboard">
        <TextWriteInput v-bind="{
      text,
      invalidChar,
      indexCurrentChar
    }"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

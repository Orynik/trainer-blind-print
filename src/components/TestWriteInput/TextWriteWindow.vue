<script setup lang="ts">
import {computed, defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import TextWriteInput from "@/components/TestWriteInput/TextWriteRender.vue";

import {startStopwatch, stopStopwatch, timeInMinute} from "@/components/_composibles/stopwatch"
import Loader from "@/components/loader.vue";

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

  if (e.key != computedCurrentChar.value && !(e.key === '-' && computedCurrentChar.value === '—')) {
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
    <loader
      v-if="isLoading"
      is-fullscreen-loader
    />
    <div
      v-else
      class="test-write"
    >
      <TextWriteInput
        class="test-write__textarea p-3"
        v-bind="{
            text,
            invalidChar,
            indexCurrentChar
          }"/>
      <aside
        class="test-write__info"
      >
        <div class="d-flex flex-column">
          <p>Скорость</p>
          <p>{{ charPerMin }} зн./мин </p>
        </div>
        <div class="d-flex flex-column">
          <p>Точность</p>
          <p>{{ accuracyWriting }} % </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';


.test-write {
  margin: 0 auto;
  display: flex;
  width: 800px;
  background: $gray-500;
  border-radius: 10px;

  &__textarea {
    flex-basis: 650px;
    background: $gray-600;
  }

  &__wrapper {
    display: flex;
  }

  &__info {
    margin: 0 auto;
    width: 100px;
  }
}
</style>

<script setup lang="ts">
import {computed, defineProps, onBeforeUnmount, onMounted, ref} from "vue";
import TextWriteInput from "@/components/TestWriteInput/TextWriteRender.vue";

let props = defineProps<{
  text: string[]
}>()

let indexCurrentChar = ref(0)

// Обработка нажатого символа
let invalidChar = ref(false)
let computedCurrentChar = computed(() => {
  return props.text[indexCurrentChar.value]
})

const listServiceKeys = ['shift', 'capslock', 'enter', 'control', 'alt', 'backspace']

function onKeyupKeyboard(e: KeyboardEvent) {
  console.log(e.key, computedCurrentChar.value)

  // TODO: Исправить TS, чтобы не выдвал ошибку на array.prototype.at
  if (indexCurrentChar.value >= props.text.length - 1) {
    //TODO: Модалка либо редирект на страницу с результатами тестирования
  }

  let isServiceKey = !!~listServiceKeys.findIndex((key) => e.key.toLowerCase() === key)
  if (isServiceKey) return

  if (e.key != computedCurrentChar.value) {
    invalidChar.value = true
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
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyupKeyboard)
})

</script>

<template>
  <div @keydown="onKeyupKeyboard">
    <TextWriteInput v-bind="{
      text,
      invalidChar,
      indexCurrentChar
    }"/>
  </div>
</template>

<style scoped lang="scss">

</style>

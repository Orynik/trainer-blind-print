<script setup lang="ts">
import {computed, defineProps, defineEmits, onBeforeUnmount, onMounted, ref, watch} from "vue";
import TextWriteInput from "@/components/TestWriteWindow/_components/TextWriteRender.vue";

import {
  startStopwatch,
  restartStopwatch,
  stopStopwatch,
  timeInMinute,
  time
} from "@/components/TestWriteWindow/_composibles/stopwatch"
import Loader from "@/components/loader.vue";

let props = defineProps<{
  text: string[],
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'backToForm', data: MouseEvent): void,
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

  indexCurrentChar.value++
}

// Конец обработки нажатия


watch(() => props.text, () => {
  if (props.text.length) startStopwatch()
});

// Хуки
onMounted(() => {
  document.addEventListener('keydown', onKeyupKeyboard)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyupKeyboard)
})

// Расчет скорости ввода
const charPerMin = computed(() => {
  let value: number = +indexCurrentChar.value / timeInMinute.value
  return value.toFixed()
})


// Расчет точности вводимой информации
const accuracyWriting = computed(() => {
  return (100 - (errorCounter.value * 100) / props.text.length).toFixed(1)
})

// Конец расчета очности вводимой информации
function backToForm(e: MouseEvent) {
  emit('backToForm', e)
}

function restart() {
  indexCurrentChar.value = 0
  invalidChar.value = false
  errorCounter.value = 0
  if (props.text.length) restartStopwatch()
}

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
        v-if="text.length"
        class="test-write__textarea p-3"
        v-bind="{
            text,
            invalidChar,
            indexCurrentChar
          }"
      />
      <div
        v-else
        class="test-write__textarea p-3"
      >
        Произошла ошибка запроса данных, попробуйте позже
      </div>

      <aside
        class="test-write__info p-3"
      >
        <div class="d-flex flex-column">
          <p>Скорость</p>
          <p>{{ charPerMin }} зн./мин </p>
        </div>

        <div class="d-flex flex-column">
          <p>Точность</p>
          <p>{{ accuracyWriting }} % </p>
        </div>

        <div class="d-flex flex-column">
          <p>Прошедшее время</p>
          <p>{{ time }} с. </p>
        </div>

        <div class="d-flex flex-column">
          <hr>
          <span> Функции </span>
          <button
            type="button"
            class="btn btn-link"
            tabindex="-1"
            @keyup.prevent
            @click.left="restart"
          >
            Заново
          </button>

          <button
            type="button"
            class="btn btn-link"
            tabindex="-1"
            @click="backToForm">
            Назад
          </button>
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
    border-radius: 10px;
  }

  &__wrapper {
    display: flex;
  }

  &__info {
    margin: 0 auto;
    width: 150px;
  }
}
</style>

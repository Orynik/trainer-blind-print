<script setup lang="ts">
import {computed, defineProps} from 'vue'

let props = defineProps<{
  text: string[]
  indexCurrentChar: number,
  invalidChar: boolean
}>()

// Вычисление и заполнения массива для построения букв для ввода
type charData = {
  id: number,
  charName: string
}

let computedCharData = computed(() => {
  let charEnum: Array<charData> = []

  props.text.forEach((char: string, index: number) => {
    charEnum.push({
      id: index,
      charName: char
    })
  })

  return charEnum
})


// Конец

</script>

<template>
  <div class="text-start">
      <span
        :key="id"
        v-for="({id,charName}) in computedCharData"
        class="char"
        :class="[
          {'custom-select': id === indexCurrentChar},
          {'custom-select--uncorrect' : invalidChar && id === indexCurrentChar }
        ]"
      >
      {{ charName }}
      </span>
  </div>
</template>

<style scoped lang="scss">
.char {
  font-size: 20px
}

.custom-select {
  padding: 0 3px 2px;
  font-size: 21px;
  background: green;
  border-radius: 5px;

  &--uncorrect {
    background: red;
  }
}
</style>

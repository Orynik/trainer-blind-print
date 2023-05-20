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
  <div class="input-group">
    <div>
      <span
        :key="id"
        v-for="({id,charName}) in computedCharData"
        :class="[
          {'badge bg-primary': id === indexCurrentChar},
          {'bg-danger' : invalidChar && id === indexCurrentChar }
        ]"
      >
      {{ charName }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

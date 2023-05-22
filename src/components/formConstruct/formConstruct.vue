<script setup lang="ts">

import {ref, defineEmits, defineProps} from "vue";

import useVuelidate from "@vuelidate/core";
import {formSchemaType} from '@/components/formConstruct/formConstructor'

const emit = defineEmits<{
  (e: 'sendData', data: object): void
}>()

const props = defineProps<{
  formSchema: formSchemaType[],
  formValidation: object
}>()

let formData: any = ref({})

props.formSchema.forEach((item) => {
  formData.value[item.name] = item.default
})

let $v = useVuelidate(props.formValidation, formData)

function sendData() {
  $v.value.$touch()
  if ($v.value.$errors.length) return
  emit('sendData', formData.value)
}
</script>

<template>
  <form>
    <h3 class="mx-5">Слепая печать</h3>

    <div
      v-for="element in formSchema"
      :key="element.name"
    >
      <div
        v-if="element.type === 'select'"
        class="input-group flex-column mb-3"
      >
        <select
          v-model="formData[element.name]"
          class="form-select w-100"
          :class="{'is-invalid': $v[element.name].$error}"
          @blur="$v[element.name].$touch()"
        >
          <option selected disabled value="default">Выберите язык:</option>
          <option
            v-for="{label,value} in element.options.selectData"
            :key="label"
            :value="value"
          >
            {{ label }}
          </option>
        </select>
        <div
          v-if="$v[element.name].$error"
          class="invalid-feedback"
        >
          <div
            :key="error.$uid"
            v-for="error in $v[element.name].$errors"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
      <div
        v-if="element.type === 'input'"
        class="input-group flex-column mb-3"
      >
        <label for="sentences" class="form-label align-self-start">{{ element.label }}</label>
        <input
          :id="element.name"
          v-model="formData[element.name]"
          class="form-control w-100"
          :class="{'is-invalid': $v[element.name].$error}"
          :placeholder="element.placeholder || 'Заполните поле'"
          @blur="$v[element.name].$touch()"
        >
        <div
          v-if="$v[element.name].$error"
          class="invalid-feedback"
        >
          <div
            :key="error.$uid"
            v-for="error in $v[element.name].$errors"
          >
            {{ error.$message }}
          </div>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <button
        class="btn btn-primary"
        type="button"
        @click="sendData"
      >
        Выбрать
      </button>
    </div>
  </form>
</template>

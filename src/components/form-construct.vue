<script setup lang="ts">

import {reactive, defineEmits} from "vue";

import {formDataAfterSend} from "@/types/formData";
import useVuelidate from "@vuelidate/core";
import {maxValue, numeric, required, between} from "@vuelidate/validators";

const emit = defineEmits<{
  (e: 'sendData', data: formDataAfterSend): void
}>()

let formData = reactive({
  lang: 'default',
  sentences: 5
})

let langDictinary = ['Ru', 'En']

const rules = {
  lang: {required},
  sentences: {maxValue, numeric, betweenValue: between(1, 15), required}
}

const $v = useVuelidate(rules, formData)

function sendData() {
  if ($v.value.$errors.length) return
  emit('sendData', formData)
}
</script>

<template>
  <form>
    <h3 class="mx-5">Слепая печать</h3>

    <div class="input-group flex-column mb-3">
      <select
        v-model="formData.lang"
        class="form-select w-100"
        :class="{'is-invalid': $v.lang.$error}"
        @blur="$v.lang.$touch()"
      >
        <option selected disabled value="default">Выберите язык:</option>
        <option
          v-for="lang in langDictinary"
          :key="lang"
          :value="lang"
        >
          {{ lang }}
        </option>
      </select>
      <div
        v-if="$v.lang.$error"
        class="invalid-feedback"
      >
        <div
          :key="error.$uid"
          v-for="error in $v.lang.$errors"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>

    <div class="input-group flex-column mb-3">
      <label for="sentences" class="form-label align-self-start">Количество предложений</label>
      <input
        id="sentences"
        v-model="formData.sentences"
        class="form-control w-100"
        :class="{'is-invalid': $v.sentences.$error}"
        placeholder="Количество предложений"
        @blur="$v.sentences.$touch()"
      >
      <div
        v-if="$v.sentences.$error"
        class="invalid-feedback"
      >
        <div
          :key="error.$uid"
          v-for="error in $v.sentences.$errors"
        >
          {{ error.$message }}
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

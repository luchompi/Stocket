<template>
  <form @submit.prevent="sendData()">
    <div v-if="props.categoria">
      <h6>Nombre de la categoría: {{ props.categoria.name }}</h6>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputName"><i class="bi bi-body-text"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese nombre de la categoría"
          aria-label="Username"
          aria-describedby="inputName"
          v-model="name"
          :required="!props.categoria"
      />
    </div>
    <button type="submit" class="btn btn-success">Guardar <i class="bi bi-check"></i></button>
  </form>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import type {Category} from '../services/categoria.interfaces'

const emits = defineEmits(['onSaveData', 'onUpdateData'])
const props = defineProps<{
  categoria?: Category
}>()

const name = ref<string>('')

const sendData = () => {
  const data = {
    ...(props.categoria ? (name.value ? ({name: name.value}) : ({name: props.categoria?.name})) : ({name: name.value}))
  }
  props.categoria ? emits('onUpdateData', data) : emits('onSaveData', data)
}
</script>
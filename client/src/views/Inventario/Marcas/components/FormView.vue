<template>
  <form @submit.prevent="saveData">
    <div v-if="props.marca">
      <p class="h6">Nombre de la marca: {{ props.marca.name }}</p>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputName"><i class="bi bi-body-text"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese nombre de la marca" aria-label="Username"
             aria-describedby="inputName" v-model="name" :required="!props.marca"/>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!name">Guardar</button>
  </form>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Brands} from '../services/marca.interfaces'

const props = defineProps<{
  marca?: Brands
}>()
const emits = defineEmits(['onSaveData', 'onUpdateData'])

const name = ref<string>('')

const saveData = () => {
  const data = {
    ...(props.marca ? (name.value ? ({name: name.value}) : ({name: props.marca?.name})) : ({name: name.value}))
  }
  props.marca ? emits('onUpdateData', data) : emits('onSaveData', data)
}

</script>
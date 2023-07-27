<script setup lang="ts">
import {ref} from 'vue'
import type { DependenciaPreview } from '../services/dependencias.interfaces';

const props = defineProps<{
  data?: DependenciaPreview | null
}>()

const emits = defineEmits(['onSave', 'onUpdateData'])


const name = ref<string>('')
const description = ref<string>('')

const storeData = () => {

  const data = {
    ...(props.data ? (name.value ? ({name: name.value}) : ({name: props.data.name})) : ({name: name.value})),
    ...(props.data ? (description.value ? ({description: description.value}) : ({description: props.data.description})) : ({description: description.value}))
  }
  props.data ? (emits('onUpdateData', data)) : (emits('onSave', data))
}

</script>

<template>
  <form @submit.prevent="storeData">
    <div class="input-group mb-3">
      <span class="input-group-text" id="depNombre"><i class="bi bi-body-text"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Nombre de la dependencia"
          :required="!props.data"
          v-model="name"
      />
    </div>
    <div class="form-floating">
      <textarea class="form-control" placeholder="Escriba una breve descripción de la dependencia"
                id="floatingTextarea2" v-model="description"
      ></textarea>
      <label for="floatingTextarea2">Descripción <i class="bi bi-blockquote-left"></i></label>
    </div>
    <br>
    <button type="submit" class="btn btn-success">Guardar <i class="bi bi-check"></i></button>
  </form>
</template>

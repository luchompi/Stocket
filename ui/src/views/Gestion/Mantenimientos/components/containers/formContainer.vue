<template>
  <form @submit.prevent="createHistory" v-if="!props.data">
    <h5>Descripción</h5>
    <p>Indique brevemente el motivo de la historia de mantenimiento</p>
    <div class="mb-3">
      <span v-if="!description">*** Este campo es obligatorio</span>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
    </div>
    <button type="submit" class="btn btn-success" :disabled="!description">Guardar <i class="bi bi-save"></i></button>
  </form>
  <form v-else @submit.prevent="updateHistory">
    <h5>Descripción de la historia con PID {{ props.data?.PID }}</h5>
    <div class="row">
      <div class="col">
        <h6>Detalles de historia</h6>
        {{ props.data?.descripcion }}
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col">
        <h6>Observaciones de mantenimiento</h6>
        <div class="mb-3">
          <span v-if="!obs">*** Este campo es obligatorio</span>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="obs"></textarea>
        </div>
      </div>
      <div class="col">
        Estado del elemento:
        <select class="form-select" aria-label="Default select example" v-model="choosed">
          <option value="0">Elija una opción</option>
          <option value="1">Reparado</option>
          <option value="2">Para cambio</option>
          <option value="3">Irreparable</option>
        </select>
        <div v-if="choosed != 0">
          <h6>Nota</h6>
          <p v-if="choosed == 3">Si el elemento es irreparable, se declarará baja</p>
          <p v-else-if="choosed == 2">Si el elemento se indica para cambio, se declarará dañado hasta obtener concepto
            diferente</p>
          <p v-else-if="choosed == 1">Si elemento es reparado, volverá a "asignado" o "por asignar" según sea el caso</p>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-success" v-if="choosed != 0 && obs.length">Finalizar <i
        class="bi bi-check"></i></button>
  </form>
</template>
<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref } from 'vue'
import type { Maintenance } from "@/views/Gestion/Mantenimientos/services/mantenimiento.interfaces";

const props = defineProps<{
  data?: Maintenance | null
}>()
const obs = ref<string>('')
const choosed = ref<number>(0)
const description = ref<string>('')
const emits = defineEmits(['sendData', 'updateData'])

const updateHistory = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro de actualizar esta historia de mantenimiento?',
    showCancelButton: true,
    confirmButtonText: 'Si, actualizar',
    cancelButtonText: 'No, cancelar'
  })
    .then((result) => {
      if (result.isConfirmed) {
        emits('updateData', { ...props.data, 'observacion': obs.value, 'estado': choosed.value })
      }
    })
}
const createHistory = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro de crear esta historia de mantenimiento?',
    showCancelButton: true,
    confirmButtonText: 'Si, crear',
    cancelButtonText: 'No, cancelar'
  })
    .then((result) => {
      if (result.isConfirmed) {
        emits('sendData', description.value)
      }
    })
}

</script>
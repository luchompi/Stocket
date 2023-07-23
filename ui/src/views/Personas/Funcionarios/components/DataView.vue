<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ props.data?.iden }} - {{ props.data?.first_name }} {{ props.data?.last_name }}</h5>
      <div class="card-text">
        <div>Estado: {{ props.data?.status }}</div>
        <div class="col col-lg-4">
          <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{ name: 'funcionarios-detail', params: { id: props.data?.iden } }" type="button"
              class="btn btn-info">Detalles <i class="bi bi-search"></i></RouterLink>
            <RouterLink :to="{ name: 'funcionarios-edit', params: { id: props.data?.iden } }" type="button"
              class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
            <button type="button" class="btn btn-danger" @click="deleteRegistry(props.data?.iden)">Borrar <i
                class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br>
</template>
<script setup lang="ts">
import type { Employee } from '../services/funcionarios.interfaces';
import { deleteEmployee } from "@/views/Personas/Funcionarios/services/funcionarios.services";
import Swal from "sweetalert2";

const props = defineProps<{
  data?: Employee | null
}>()


const emits = defineEmits(['onDeleteData'])


const deleteRegistry = async (id: any) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      proceedDeleting(id)
    }
  })
}

const proceedDeleting = async (id: any) => {
  await deleteEmployee(id)
    .then((Response) => {
      Swal.fire({
        icon: 'success',
        title: 'Eliminado correctamente',
        text: 'Registro eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      emits('onDeleteData', id)
    })
}
</script>
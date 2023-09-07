<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ props.data?.NIT }} - {{ props.data?.razonSocial }}</h5>
      <div class="row">
        <div class="col">
          <p>Ciudad: {{ props.data?.city }}</p>
          <p>Dirección: {{ props.data?.address }}</p>
        </div>
        <div class="col">
          <p>Teléfono: {{ props.data?.phone }}</p>
          <p>Correo: {{ props.data?.email }}</p>
        </div>
      </div>
      <RouterLink :to="{name:'proveedores-update',params:{nit:props.data?.NIT}}" type="button"
                  class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
      <button @click="deleteReg(props.data?.NIT)" type="button" class="btn btn-danger">Borrar <i
          class="bi bi-trash"></i></button>
    </div>
  </div>
</template>
<script setup lang="ts">

import type {Suppliers} from "@/views/Personas/Proveedores/services/proveedor.interfaces";
import Swal from "sweetalert2";

const props = defineProps<{
  data?: Suppliers | null
}>();

const emits = defineEmits(['onDeleteData'])

const deleteReg = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro?',
    text: 'Esta acción no se puede deshacer',
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d'
  }).then((result) => {
    if (result.isConfirmed) {
      emits('onDeleteData', props.data?.NIT)
    }
  })
}

</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Ingrese los datos solicitados</h4>
      <div class="card-text">
        <FormData @onSave="onSave" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import FormData from './FormData.vue'
import type { sedes } from "@/views/Empresa/sede/services/sedes.interfaces";
import { storeSede } from "@/views/Empresa/services/empresa.services";
import Swal from 'sweetalert2';
import { errorValidator } from '@/hooks/errors.hooks';

const url = useRouter()
const NIT = url.currentRoute.value.params.nit
const onSave = async (data: sedes) => {
  await storeSede(data, NIT)
    .then((Response) => {
      Swal.fire({
        icon: 'success',
        title: '¡Sede creada!',
        text: 'La sede se ha creado correctamente',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        timer: 5000
      }).then(() => {
        url.push({ name: 'sedes' })
      })
    })
    .catch((error) => {
      const resiever = errorValidator(error.response.data)
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: JSON.stringify(error.response.data.error),
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        timer: 5000
      })
    })
}
</script>
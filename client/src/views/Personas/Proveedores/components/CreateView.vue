<template>
  <h4>Ingrese los datos solicitados</h4>
  <div class="row">
    <FormView @onSaveData="onSaveData"/>
  </div>
</template>
<script setup lang="ts">
import type {Suppliers} from '../services/proveedor.interfaces';
import FormView from './FormView.vue'
import {saveProveedores} from "@/views/Personas/Proveedores/services/proveedor.services";
import Swal from "sweetalert2";
import {errorValidator} from "@/hooks/errors.hooks";
import {ref} from "vue";
import {useRouter} from "vue-router";

const loading = ref<boolean>(false)
const url = useRouter()
const onSaveData = async (data: Suppliers) => {
  loading.value = true
  await saveProveedores(data)
      .then((Response) => {
        Swal.fire({
          icon: 'success',
          title: 'Proveedor creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        url.push({name: 'proveedores'})
      })
      .catch((error) => {
        const resiever = errorValidator(error.response.data)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resiever,
        })
      })
      .finally(() => {
        loading.value = false
      })

}
</script>
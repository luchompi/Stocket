<script setup lang="ts">
import FormViewComponent from "@/views/Empresa/dependencias/components/FormViewComponent.vue";
import type { Dependencia } from "../services/dependencias.interfaces";
import { saveDependencias } from "../services/dependencias.services";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { errorValidator } from "@/hooks/errors.hooks";

const loading = ref<boolean>(false)
const url = useRouter()

const onSave = async(data:Dependencia) => {
  loading.value = true
  await saveDependencias(data)
  .then((Response) => {
    Swal.fire({
      icon: 'success',
      title: 'Dependencia creada con éxito',
      showConfirmButton: false,
      timer: 1500
    })
    url.push({name:'dependencias'})
  })
  .catch((error)=>{
    const validator = errorValidator(error.response.data)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: validator,
    })
  })
  .finally(()=>{
    loading.value = false
  })
  
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Crear nueva dependencia</h5>
      <p class="card-text">Ingrese los datos solicitados</p>
      <div v-if="loading">
      Espere...
      <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      </div>
      <FormViewComponent @onSave="onSave" v-else/>
    </div>
  </div>

</template>


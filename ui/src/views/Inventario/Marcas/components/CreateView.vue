<template>
  <div v-if="loading">

  </div>
<div class="row" v-else>
    <div class="card-text">
        <h5>Crear nueva marca</h5>
        <p>Ingrese los datos solicitados</p>
    </div>
    <div class="col">
        <FormView @onSaveData="onSaveData"/>
    </div>
</div>

</template>

<script setup lang="ts">
import FormView from './FormView.vue'
import {saveBrand} from "@/views/Inventario/Marcas/services/marca.services";
import Swal from "sweetalert2";
import {useRouter} from 'vue-router'
import {errorValidator} from "@/hooks/errors.hooks";
import {ref} from 'vue'

const url = useRouter()
const loading = ref<boolean>(false)
const onSaveData = async(data:any)=>{
  loading.value = true
  await saveBrand(data)
  .then((Response)=>{
    Swal.fire({
      icon:'success',
      title: 'Marca creada con exito',
      showConfirmButton: false,
      timer: 1500
    })
    url.push({name:'marcas'})
  })
  .catch((error)=>{
    const reciever = errorValidator(error.response.data)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: reciever
    })
  })
  .finally(()=>{
    loading.value = false
  })
}
</script>
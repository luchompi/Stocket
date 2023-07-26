<template>
  <div class="container">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Datos de Proveedor</h4>
          <div v-if="loading">
            Espere ...
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div class="card-text" v-else>
            <div class="row">
              <div class="col">
                <DataView :data="proveedor"/>
              </div>
              <div class="col">
                <FormView :data="proveedor" @onUpdateData="onUpdateData"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {getProveedoresById, updateProveedor} from "@/views/Personas/Proveedores/services/proveedor.services";
import type {Suppliers} from "@/views/Personas/Proveedores/services/proveedor.interfaces";
import {errorValidator} from "@/hooks/errors.hooks";
import Swal from "sweetalert2";
import DataView from "./DataView.vue";
import FormView from './FormView.vue'

const url = useRouter()
const loading = ref<boolean>(false)
const proveedor = ref({} as Suppliers)

onMounted(() => {
  getData()
})

const getData = async () => {
  loading.value = true
  await getProveedoresById(url.currentRoute.value.params.nit)
      .then((Response) => {
        proveedor.value = Response.data
      })
      .catch((error) => {
        const resiever = errorValidator(error.response.data)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resiever,
          showConfirmButton: true
        })
      })
      .finally(() => {
        loading.value = false
      })

}

const onUpdateData = async(data:Suppliers) =>{
  loading.value = true
  await updateProveedor(url.currentRoute.value.params.nit,data)
  .then((Response)=>{
    Swal.fire({
      icon:'success',
      title:'Actualizado',
      text:'Proveedor actualizado correctamente',
      showConfirmButton:true,
      timerProgressBar:true,
      timer:5000
    })
    getData()
  })
  .catch((error)=>{
    const reciever = errorValidator(error.response.data)
    Swal.fire({
      icon:'error',
      title:'Error',
      text:reciever,
      showConfirmButton:true
    })
  })
  .finally(()=>{
    loading.value = false
  })
}
</script>
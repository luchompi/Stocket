<template>
  <h4>Listado de proveedores</h4>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese NIT o razón social a buscar" aria-label="Username"
             aria-describedby="inputSearch" v-model="search"/>
    </div>
    <div v-if="loading">
      Espere...
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="proveedores.length">
        <div v-for="element in proveedores" :key="element.NIT">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">{{ element.NIT }} - {{ element.razonSocial }}</h4>
              <p>Registro creado el {{ element?.created_at }}</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                <RouterLink :to="{name:'proveedores-details',params:{nit:element.NIT}}" type="button"
                            class="btn btn-info">Ver <i class="bi bi-search"></i></RouterLink>
                <RouterLink :to="{name:'proveedores-update',params:{nit:element.NIT}}" type="button" class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
                <button @click="showMessage(element.NIT)" type="button" class="btn btn-danger">Borrar <i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>¡404!</strong> No hay datos que mostrar
        </div>
      </div>

    </div>

  </div>
</template>
<script setup lang="ts">
import {getProveedores, getProveedoresByNameOrNIT,deleteProveedor} from '../services/proveedor.services';
import {ref, watchEffect} from 'vue'
import type {SuppliersPreview} from '../services/proveedor.interfaces';
import Swal from 'sweetalert2';

const proveedores = ref([] as SuppliersPreview[])
const search = ref<string>('')
const loading = ref<boolean>(false)

const getData = async () => {
  loading.value = true
  const response = await getProveedores()
  proveedores.value = response.data
  loading.value = false
}

const searchData = async () => {
  loading.value = true
  const response = await getProveedoresByNameOrNIT(search.value)
  proveedores.value = response.data
  loading.value = false
}

const proceed = async(id:any) =>{
  await deleteProveedor(id)
  .then((Response)=>{
    Swal.fire({
      icon:'success',
      title:'Eliminado',
      text:'Proveedor eliminado correctamente',
      showConfirmButton:true,
      timerProgressBar:true,
      timer:5000
    })
    proveedores.value = proveedores.value.filter((element)=>element.NIT !== id)
  })
  .catch((error)=>{
    const reciever = error.response.data
    Swal.fire({
      icon:'error',
      title:'Error',
      text:reciever,
      timer:2000,
      timerProgressBar:true,
      showConfirmButton:true
    })
  })

}

const showMessage = (id:any)=>{
  Swal.fire({
    icon:'question',
    title:'¿Está seguro?',
    text:'Verifique los datos primero, este proceso no se puede deshacer',
    showCancelButton:true,
    showConfirmButton:true,
    confirmButtonText:'Sí, proceder',
    cancelButtonText:'No, cancelar'
  })
  .then((result)=>{
    if(result.isConfirmed){
      proceed(id)
    }
  })
}

watchEffect(() => {
  if (search.value) {
    searchData()
  } else {
    getData()
  }
})
</script>
<template>
  <div class="card-body">
    <div>
      <h6>Estas son las sedes en sistema</h6>
    </div>
<div v-if="loading">
  Espere... 
  <div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>
<div v-else>
  <div class="alert alert-warning" role="alert" v-if="!queryset.length">
      <strong>404!</strong> No hay datos que mostrar.
    </div>
    <table class="table table-striped table-hover" v-else>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Opciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="element in queryset" :key="element.id">
        <td>
          {{ element.id }}
        </td>
        <td>
          {{ element.name }}
        </td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{name:'sedes-detail', params:{nit:url.currentRoute.value.params.nit,id:element.id}}"
                        type="button" class="btn btn-info">
              Detalles <i
                class="bi bi-search"></i>
            </RouterLink>
            <RouterLink :to="{name:'sedes-update',params:{nit:url.currentRoute.value.params.nit,id:element.id}}" type="button" class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
            <button type="button" class="btn btn-danger" @click="eliminarSede(element.id)">Eliminar <i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
</div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {deleteSede, getSedes} from "@/views/Empresa/services/empresa.services";
import {useRouter} from 'vue-router';
import Swal from "sweetalert2";
import { errorValidator } from "@/hooks/errors.hooks";

const url = useRouter()
const loading = ref<boolean>(false)
const queryset = ref<any>([])
onMounted(async () => {
  loading.value = true
  const NIT = url.currentRoute.value.params.nit
  await getSedes(NIT.toString())
  .then((Response)=>{
    queryset.value = Response.data
  })
  .catch((error)=>{
    const resiever = errorValidator(error.response.data)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: resiever,
    })
  })
  .finally(()=>{
    loading.value = false
  })
})

const eliminarSede = async(id:any) => {
  const response = await deleteSede(url.currentRoute.value.params.nit,id)
  if(response.status == 204){
    Swal.fire({
      icon: 'success',
      title: 'Sede eliminada',
      showConfirmButton: false,
      timer: 1500
    })
    queryset.value = queryset.value.filter((element:any) => element.id != id)
  }
}
</script>
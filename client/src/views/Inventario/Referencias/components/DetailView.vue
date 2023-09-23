<template>
  <div class="row">
    <div class=" d-flex align-items-center">
      <div class="text-center flex-grow-1 mb-0"><h6>Marcas en categoría</h6></div>
      <div class="btn-group ml-auto" role="group" aria-label="Basic example">
        <RouterLink :to="{ name: 'refer-list' }" class="btn btn-primary">Listado <i class="bi bi-person-lines-fill"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'refer-create' }" class="btn btn-success">Añadir <i class="bi bi-person-plus"></i>
        </RouterLink>
      </div>
    </div>
    <div v-if="loading">
      Espere ...
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div v-if="marca.length">
        <br>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" placeholder="Ingrese nombre de la marca a buscar" v-model="search">
        </div>
        <p>Estas son las marcas contenidas en la categoría</p>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(element) in marca" :key="element.id">
              <td>{{ element.id }}</td>
              <td>{{ element.marca}}</td>
              <td><button type="button" @click="removeMarca(element.id)" class="btn btn-danger">Remover <i class="bi bi-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <br>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>¡404! </strong> No hay datos que mostrar.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {deleteReference, getReferences} from '../services/services/referencias.services';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const url = useRouter();
const loading = ref<boolean>(false);
const marca = ref([] as any[]);
const search = ref<string>('');

const fetchData = async () => {
  loading.value = true;
  await getReferences(url.currentRoute.value.params.id)
    .then((Response) => {
      marca.value = Response.data;
    })
    .finally(() => {
      loading.value = false;
    });
}

const findData = async () => {
  loading.value = true;

  loading.value = false;
}

watchEffect(() => {
  search.value.length ? findData() : fetchData();
});

const proceed = async (id:any)=>{
  const response = await deleteReference(id)
      if(response.status == 204){
        Swal.fire({
          icon:'success',
          title: 'Marca eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        marca.value = marca.value.filter((element:any) => element.id !== id)
      }
}

const removeMarca = async(id:any) =>{
  loading.value = true;
  Swal.fire({
    icon:'question',
    title:'¿Está seguro?',
    text:'¿Desea remover la marca de la categoría?',
    showCancelButton:true,
    confirmButtonText:'Si, remover',
    cancelButtonText:'No, cancelar',
  }).then((result)=>{
    if(result.isConfirmed){
      proceed(id)
    }
  })
  loading.value = false;
}

</script>
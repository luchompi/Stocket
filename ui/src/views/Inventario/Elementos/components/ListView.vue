<script setup lang="ts">
import {getAllElements,findElementByPlaca, elementoABaja} from '../services/elementos.services';
import {ref, watchEffect} from 'vue'
import type {ElementPreview} from '../services/elementos.interfaces'
import Swal from 'sweetalert2';

const elementos = ref([] as ElementPreview[])
const search = ref<string>('')
const loading = ref<boolean>(false)

const getAllData = async () => {
  loading.value = true
  elementos.value = (await getAllElements()).data
  loading.value = false
}

const declararBaja = (item:ElementPreview) => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro?',
    text: `¿Desea declarar a baja el elemento de placa ${item.placa}?`,
    showCancelButton: true,
    confirmButtonText: 'Si, declarar a baja',
    cancelButtonText: 'No, cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      elementoABaja(item.placa)
      getAllData()
    }
  })
}

const findData = async () => {
  loading.value = true
  await findElementByPlaca(search.value)
  .then((Response)=>{
    elementos.value = Response.data
  })
  .catch((error)=>{
    elementos.value = []
  })
  .finally(()=>{
    loading.value = false
  })
}

watchEffect(() => {
  search.value ? findData() : getAllData()
})

</script>

<template>
  <div class="input-group mb-3">
      <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese placa de elemento a buscar"
          v-model="search"
      />
    </div>
  <div v-if="loading">
    Espere ...
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else-if="elementos.length">
    <table class="table table-hover table-striped">
      <thead>
      <tr>
        <th scope="col">Placa</th>
        <th scope="col">Referencia</th>
        <th scope="col">Modelo</th>
        <th scope="col">Estado</th>
        <th scope="col">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in elementos" :key="item.placa">
        <td>{{ item.placa }}</td>
        <td>{{ item.referencia }}</td>
        <td>{{ item.modelo }}</td>
        <td>{{ item.estado }}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{name:'elementos-details',params:{placa:item.placa}}" type="button" class="btn btn-primary">Ver <i class="bi bi-search"></i></RouterLink>
            <RouterLink :to="{name:'elementos-edit',params:{placa:item.placa}}" type="button" class="btn btn-warning">Edita <i class="bi bi-pencil-square"></i></RouterLink>
            <button @click="declararBaja(item)" type="button" class="btn btn-danger">A baja <i class="bi bi-download"></i></button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>¡404! </strong> No hay datos que mostrar.
    </div>
  </div>
</template>
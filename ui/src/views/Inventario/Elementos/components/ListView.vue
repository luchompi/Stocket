<script setup lang="ts">
import {getAllElements} from '../services/elementos.services';
import {ref, watchEffect} from 'vue'
import type {ElementPreview} from '../services/elementos.interfaces'

const elementos = ref([] as ElementPreview[])
const search = ref<string>('')
const loading = ref<boolean>(false)

const getAllData = async () => {
  loading.value = true
  elementos.value = (await getAllElements()).data
  loading.value = false
}

const findData = async () => {
  console.log(search.value)
}

watchEffect(() => {
  search.value.length ? findData() : getAllData()
})

</script>

<template>
  <div v-if="loading">
    Espere ...
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else-if="elementos.length">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese placa de elemento a buscar"
          v-model="search"
      />
    </div>
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
            <RouterLink :to="{name:'elementos-details',params:{placa:item.placa}}" type="button" class="btn btn-primary">Ver</RouterLink>
            <RouterLink :to="{name:'elementos-edit',params:{placa:item.placa}}" type="button" class="btn btn-warning">Editar</RouterLink>
            <button type="button" class="btn btn-danger">Declarar baja</button>
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
<template>
  <div class="card-text">
    <div class="row">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
        <input type="text" class="form-control" placeholder="Escriba nombre de Categoria a buscar"
               aria-label="Username" aria-describedby="inputSearch" v-model="search"/>
      </div>
      <div class="col">
        <div v-if="loading">
          Espere ...
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else>
          <div v-if="!categorias.length">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>¡404!</strong> No hay elementos que mostralert.
            </div>
          </div>
          <div v-else>
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Opciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="element in categorias" :key="element.id">
                <th scope="row">{{ element.id }}</th>
                <td>{{ element.name }}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <RouterLink :to="{name:'categorias-editar',params:{id:element.id}}" type="button"
                                class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i>
                    </RouterLink>
                    <button type="button" class="btn btn-danger" @click="deleteCategoria(element.id)">Borrar <i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import type {Category} from '../services/categoria.interfaces'
import {deleteCategory, getAllCategories, getCategoriesByName} from '../services/categoria.services';

const categorias = ref([] as Category[])
const search = ref<string>('')
const loading = ref<boolean>(false)

const getData = async () => {
  loading.value = true
  categorias.value = (await getAllCategories()).data
  loading.value = false
}

const getDataByName = async () => {
  loading.value = true
  categorias.value = (await getCategoriesByName(search.value)).data
  loading.value = false
}

const deleteCategoria = async (id: any) => {
  const response = await deleteCategory(id)
  if (response == 204) {
    categorias.value = categorias.value.filter((element) => element.id != parseInt(id))
  }

}

watchEffect(() => {
  search.value.length >= 3 ? getDataByName() : getData()
})
</script>
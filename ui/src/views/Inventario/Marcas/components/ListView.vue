<template>
  <div class="card-text">
    <h5>Listado de Marcas en sistema</h5>
    <div class="row">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
        <input type="text" class="form-control" placeholder="Ingrese nombre de marca a buscar" aria-label="Username"
          aria-describedby="inputSearch" v-model="search" />
      </div>
      <div class="col col-lg-9">
        <div v-if="loading">
          Espere ...
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else-if="!loading && marcas.length">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="element in marcas" :key="element.id">
                <th scope="row">{{ element.id }}</th>
                <td>{{ element.name }}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                    <RouterLink :to="{name:'marcas-editar',params:{id:element.id}}" type="button" class="btn btn-warning">Editar <i class="bi bi-pencil-square"></i></RouterLink>
                    <button type="button" class="btn btn-danger" @click="showMessage(element.id)">Borrar <i
                        class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>¡404!</strong> No hay datos que mostrar
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Brands } from '../services/marca.interfaces'
import { getAllBrands, getBrand, deleteBrand } from '../services/marca.services'
import Swal from 'sweetalert2';

const loading = ref<boolean>(false)
const search = ref<string>('')
const marcas = ref([] as Brands[])

const fetchData = async () => {
  loading.value = true
  const response = await getAllBrands()
  marcas.value = response.data
  loading.value = false
}

const filterData = async () => {
  loading.value = true
  marcas.value = (await getBrand(search.value)).data
  loading.value = false
}

const proceedDelete = async (id: any) => {
  await deleteBrand(id)
    .then((Response) => {
      marcas.value = marcas.value.filter((element: any) => element.id !== id)
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El registro ha sido eliminado con éxito'
      })
    })
}

const showMessage = (id: any) => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro?',
    text: 'No podrá revertir esta acción',
    showCancelButton: true,
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'No, cancelar'
  })
    .then((result) => {
      if (result.isConfirmed) {
        proceedDelete(id)
      }
    })
}


watchEffect(() => {
  search.value ? filterData() : fetchData()
})

</script>
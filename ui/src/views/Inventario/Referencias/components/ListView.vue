<template>
  <h5>Seleccione una categoría para comenzar</h5>
  <div class="row justify-content-md-center">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese nombre de la categoría a buscar"
             aria-label="Username"
             aria-describedby="basic-addon1">
    </div>
    <div v-if="loading">
      <div class="d-flex justify-content-center">
        Espere ...
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-else-if="categorias.length">
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
            <RouterLink :to="{name:'refer-detail',params:{id:element.id}}" class="btn btn-success">Explorar <i
                class="bi bi-search"></i></RouterLink>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>¡404!</strong> No hay datos que mostrar.
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import {getAllCategories, getCategoriesByName} from '../../Categorias/services/categoria.services';

const loading = ref<boolean>(false);
const categorias = ref<any[]>([]);
const search = ref<string>('');

const getData = async () => {
  loading.value = true;
  const response = await getAllCategories();
  categorias.value = response.data;
  loading.value = false;
}

const searchData = async () => {
  loading.value = true;
  const response = await getCategoriesByName(search.value);
  categorias.value = response.data;
  loading.value = false;

}

watchEffect(() => {
  search.value.length > 3 ? searchData() : getData();
})

</script>
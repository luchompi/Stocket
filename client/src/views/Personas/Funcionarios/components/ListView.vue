<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { findEmployeeByIdOrName, getAllEmployees } from '../services/funcionarios.services';
import type { Employee } from '../services/funcionarios.interfaces';
import { errorValidator } from '@/hooks/errors.hooks';
import DataView from './DataView.vue';
import Swal from "sweetalert2";

const search = ref<string>('')
const queryset = ref([] as Employee[])
const loading = ref<boolean>(false)


const fetchData = async () => {
  loading.value = true
  await getAllEmployees()
    .then((Response) => {
      queryset.value = Response.data
    })
    .finally(() => {
      loading.value = false
    })
}

const searchData = async () => {
  const response = await findEmployeeByIdOrName(search.value)
  queryset.value = response.data
}

watchEffect(() => {
  if (!!search.value) {
    searchData()
  } else {
    fetchData()
  }
})


const onDeleteData = (id: any) => {
  queryset.value = queryset.value.filter((element) => element.iden !== id)
}


</script>

<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
    <input type="text" class="form-control" placeholder="Ingrese identificación o nombre de funcionario a buscar"
      aria-label="Username" aria-describedby="inputSearch" v-model="search" />
  </div>
  <div v-if="loading">
    Espere...
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <div v-if="queryset.length">
      <div v-for="element in queryset">
        <DataView :data="element" @onDeleteData="onDeleteData" />
      </div>
    </div>
    <div v-else>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>404 </strong> No hay datos que mostrar.
      </div>
    </div>
  </div>
</template>


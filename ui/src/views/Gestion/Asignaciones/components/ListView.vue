<template>
  <div class="card-body">
    <h6 class="card-title">Listado de asignaciones <i class="bi bi-list-check"></i></h6>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese id de funcionaro a consultar" aria-label="Username"
             aria-describedby="basic-addon1" v-model="search">
    </div>
    <div v-if="loading">
      Espere ...
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="data.length">
      <table class="table table-striped table-hover">
        <thead>
        <tr>
          <th scope="col">PID</th>
          <th scope="col">Funcionario</th>
          <th scope="col">Fecha de asignación</th>
          <th scope="col">Usuario</th>
          <th scope="col">Opciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="element in data">
          <td>{{ element.id }}</td>
          <td>{{ element.funcionario[0].iden }} - {{ element.funcionario[0].first_name }}
            {{ element.funcionario[0].last_name }}
          </td>
          <td>{{ element.timestamps }}</td>
          <td>{{ element.user }}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic example">
              <RouterLink :to="{name:'asig-detail',params:{id:element.id}}" type="button" class="btn btn-primary">Ver <i
                  class="bi bi-search"></i></RouterLink>
              <button type="button" class="btn btn-danger">Anular <i class="bi bi-trash"></i></button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <div class="alert alert-warning" role="alert">
        <strong>404 </strong>No se encontraron resultados
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {findAsignaciones, getAsignaciones} from "../services/asignacion.services";
import type {Asignation} from "../services/asignacion.interfaces"

const loading = ref<boolean>(false)
const data = ref([] as Asignation[])
const search = ref<string>('')

const getData = async () => {
  loading.value = true
  const response = await getAsignaciones()
  data.value = response.data
  loading.value = false
}

const findData = async () => {
  loading.value = true
  const response = await findAsignaciones(search.value)
  data.value = response.data
  loading.value = false
}
watchEffect(() => {
  search.value ? findData() : getData()
})
</script>

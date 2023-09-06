<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Baja} from '../services/bajas.interfaces'
import {obtenerBajas} from "@/views/Gestion/Bajas/services/bajas.services";

const baja = ref([] as Baja[])

const getData = async () => {
  baja.value = (await obtenerBajas()).data
}

onMounted(() => {
  getData()
})
</script>

<template>
  <h4 class="card-title">Listado de bajas </h4>
  <div class="card-text">
    <h5>Bajas en sistema</h5>
    <table class="table table-striped table-hover" v-if="baja.length">
      <thead>
      <th>PID</th>
      <th>Fecha</th>
      <th>Procesado por</th>
      <th>Explorar</th>
      </thead>
      <tbody>
      <tr v-for="item in baja">
        <td>{{ item.PID }}</td>
        <td>{{ item.timestamps }}</td>
        <td>{{ item.user }}</td>
        <td>
          <RouterLink :to="{name:'bajas-detalle',params:{id:item.PID}}" type="button" class="btn btn-success"><i
              class="bi bi-search"></i></RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>404!</strong> No hay datos que mostrar.
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {obtenerBajas} from "@/views/Gestion/Bajas/services/bajas.services";
import type {Baja} from "@/views/Gestion/Bajas/services/bajas.interfaces";

const bajas = ref([] as Baja[])
const loading = ref<boolean>(false)
const getData = async () => {
  loading.value = true
  bajas.value = (await obtenerBajas()).data
  loading.value = false
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="card">
    <div class="card-body" v-if="loading">
      Espere ...
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card-body" v-else>
      <h4 class="card-title">Bajas por procesar</h4>
      <div class="card-text" v-if="bajas.length > 0">
        <p>Hay {{ bajas.length }} baja(s) por procesar.</p>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">PID</th>
            <th scope="col">Creada el</th>
            <th scope="col">Creada por</th>
            <th scope="col">Ver</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="element in bajas" :key="element.PID">
            <td>
              {{ element.PID }}
            </td>
            <td>
              {{ element.timestamps }}
            </td>
            <td>
              {{ element.user }}
            </td>
            <td>
              <RouterLink :to="{name: 'bajas-detalle', params: {id: element.PID}}">
                <button class="btn btn-primary">Ver</button>
              </RouterLink>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="alert alert-primary alert-dismissible fade show" role="alert">
          <strong>404!</strong> No existen bajas pendientes.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
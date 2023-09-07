<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Maintenance} from "@/views/Gestion/Mantenimientos/services/mantenimiento.interfaces";
import {obtenerElementosEnMantenimiento} from "@/views/Gestion/Mantenimientos/services/mantenimiento.services";

const mantenimientos = ref([] as Maintenance[]);

const getData = async () => {
  mantenimientos.value = (await obtenerElementosEnMantenimiento()).data
}

onMounted(() => {
  getData()
})

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Reporte de mantenimienos</h4>
      <div class="card-text" v-if="mantenimientos.length > 0">
        <p>Existen {{ mantenimientos.length }} elementos en mantenimiento</p>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">PID</th>
            <th scope="col">Elemento</th>
            <th scope="col">Estado</th>
            <th scope="col">Ver</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="mantenimiento in mantenimientos" :key="mantenimiento.PID">
            <th scope="row">{{ mantenimiento.PID }}</th>
            <td v-for="index in mantenimiento.elemento">
              <span>Placa: {{ index.placa }} - {{ index.referencia }} {{ index.modelo }}</span>
            </td>
            <td>{{ mantenimiento.estado }}</td>
            <td>
              <RouterLink type="button" class="btn btn-primary"
                          :to="{name: 'fix-details', params: {id: mantenimiento.PID}}">Ver
              </RouterLink>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="alert alert-primary alert-dismissible fade show" role="alert">
          <strong>404!</strong> No existen mantenimientos pendientes.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
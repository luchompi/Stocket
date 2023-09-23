<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Element} from "@/views/Inventario/Elementos/services/elementos.interfaces";
import {obtenerElementosParaBaja} from "@/views/Gestion/Bajas/services/bajas.services";
import {bajaStore} from "../../services/bajas.store";

const store = bajaStore()
const bajas = ref([] as Element[])

const getElementos = async () => {
  bajas.value = (await obtenerElementosParaBaja()).data
}

onMounted(() => {
  getElementos()
})

</script>

<template>
  <p>Indique elementos a añadir a baja</p>
  <table class="table table-striped table-hover" v-if="bajas.length">
    <thead>
    <th>Placa</th>
    <th>Referencia</th>
    <th>Modelo</th>
    <th>Estado</th>
    <th>Añadir</th>
    </thead>
    <tbody>
    <tr v-for="element in bajas">
      <td>{{ element.placa }}</td>
      <td>{{ element.referencia }}</td>
      <td>{{ element.modelo }}</td>
      <td>{{ element.estado }}</td>
      <td>
        <button class="btn btn-primary" @click="store.añadirElemento(element)"><i class="bi bi-arrow-right"></i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
  <div v-else>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>404!</strong> No hay datos que mostrar.
    </div>
  </div>
</template>
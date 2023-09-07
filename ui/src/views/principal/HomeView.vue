<script setup lang="ts">
import {sesionStore} from "@/stores/sesion.store";
import {borrarBaja} from "@/views/Gestion/Bajas/services/bajas.services";
import {onMounted, watchEffect} from "vue";
import bajaComponent from './components/bajaComponent.vue'
import mantenimientoComponent from './components/mantenimientoComponent.vue'

onMounted(() => {
  watchEffect(async () => {
    if (sesionStore().isLogged) {
      await borrarBaja()
    }
  })
})


</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-body">
        <div class="card-title">
          <h1>Stocket</h1>
        </div>
        <p class="card-text">
          Bienvenido a Stocket, una aplicación para el control de inventarios.
        </p>
      </div>
    </div>
  </div>
  <br>
  <div class="row" v-if="sesionStore().isLogged">
    <div class="col">
      <bajaComponent/>
    </div>
    <div class="col">
      <mantenimientoComponent/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {sesionStore} from "@/stores/sesion.store";
import {borrarBaja} from "@/views/Gestion/Bajas/services/bajas.services";
import {onMounted, watchEffect} from "vue";

onMounted(() => {
  watchEffect(async () => {
    if (sesionStore().isLogged) {
      await borrarBaja()
    }
  })
})


</script>

<template>
  <div class="card-body">
    <div class="card-title">
      <h1>Stocket</h1>
    </div>
    <p class="card-text">
      Bienvenido a Stocket, una aplicación para el control de inventarios.
    </p>

  </div>
</template>
<script setup lang="ts">
import elementsContainer from './containers/elementsContainer.vue'
import storeContainer from './containers/storeContainer.vue'
</script>

<template>
  <h4 class="card-title">Crear nueva baja </h4>
  <div class="card-text">
    <div class="row">
      <div class="col">
        <elementsContainer/>
      </div>
      <div class="col">
        <storeContainer/>
      </div>
    </div>
  </div>
</template>

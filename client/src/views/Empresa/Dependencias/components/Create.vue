<template>
  <div class=" d-flex align-items-center">
    <div class="flex-grow-1 mb-0">
      <h3>Listado de dependencias</h3>
    </div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <RouterLink :to="{ name: 'DepartamentosList' }" type="button" class="btn btn-secondary ml-auto">
        Atrás
        <i class="bi bi-arrow-left"></i>
      </RouterLink>
    </div>
  </div>
  <Form />
</template>
<script setup lang="ts">
import Form from "./Form.vue";
document.title ='Crear dependencia - Stocket'
</script>
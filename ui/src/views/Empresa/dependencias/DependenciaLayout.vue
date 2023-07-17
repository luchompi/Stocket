<script setup lang="ts">

</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class=" d-flex align-items-center mb-4">
        <h5 class="card-title text-center flex-grow-1 mb-0">Dependencias</h5>
        <RouterLink :to="{ name: 'dependencias-nuevo' }" class="btn btn-primary">Agregar <i class="bi bi-plus"></i>
        </RouterLink>
      </div>
      <div class="card-text">
        <router-view />
      </div>

    </div>
  </div>
</template>


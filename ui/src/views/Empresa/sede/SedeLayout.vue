<template>
  <div class="card">
    <div class="card-header">
      <div class=" d-flex align-items-center">
        <div class="text-center flex-grow-1 mb-0">Sedes - Stocket <i class="bi bi-archive-fill"></i></div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <RouterLink :to="{ name: 'sedes-create', params: { nit: url.currentRoute.value.params.nit } }" type="button"
            class="btn btn-primary">
            Nuevo <i class="bi bi-plus-square"></i></RouterLink>
          <RouterLink :to="{ name: 'empresa' }" class="btn btn-secondary">Ir a empresa <i class="bi bi-arrow-left"></i></RouterLink>
        </div>
      </div>
    </div>
    <div class="card-body">

      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const url = useRouter()
</script>
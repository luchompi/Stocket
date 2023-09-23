<script setup lang="ts">
import {useRouter} from "vue-router";

const url = useRouter()
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class=" d-flex align-items-center mb-4">
        <h5 class="card-title text-center flex-grow-1 mb-0">Dependencias</h5>
        <RouterLink :to="{ name: 'dependencias-nuevo' }" class="btn btn-primary"
                    v-if="url.currentRoute.value.name != 'dependencias-nuevo'">Agregar <i class="bi bi-plus"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'dependencias' }" class="btn btn-secondary"
                    v-else>Atrás <i class="bi bi-arrow-left"></i>
        </RouterLink>
      </div>
      <div class="card-text">
        <router-view/>
      </div>

    </div>
  </div>
</template>


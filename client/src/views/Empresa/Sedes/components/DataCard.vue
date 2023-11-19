<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class=" d-flex align-items-center">
          <div class="flex-grow-1 mb-0">
            <h5 class="card-title">Sede: {{ props.data.name }}</h5>

          </div>
          <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{ name: 'SedeUpdate', params: { id: props.data.id } }" type="button" class="btn btn-warning ml-auto">
              <i class="bi bi-pencil-square"></i>
            </RouterLink>
            <button @click="store.eliminarSede(props.data.id)" type="button" class="btn btn-danger ml-auto">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <tr class="card-text">Dirección {{ props.data.address }}</tr>
        <tr class="card-text">Teléfono {{ props.data.phone }}</tr>
        <tr class="card-text">Email {{ props.data.email }}</tr>
        <tr class="card-text">Sitio web {{ props.data.web || 'No hay registros' }}</tr>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Sede } from '../services/sedes.interfaces';
import useSedeStore from '@/stores/sedes.store';
const store = useSedeStore()

const props = defineProps<{
  data: Sede;
}>();
</script>
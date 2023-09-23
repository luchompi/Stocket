<template>
  <div class="mx-auto" v-for="element in props.empresa" :key="element.NIT" v-if="props.empresa?.length">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="https://placehold.co/200x200" alt="Imagen de usuario" class="img-fluid rounded-start">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4>NIT: <strong>{{ element.NIT }}</strong> - {{ element.name }}</h4>
          <div>Correo: {{ element.email }}</div>
          <div>Teléfono: {{ element.phone }}</div>
          <div>Dirección: {{ element.address }}</div>
          <p class="text-muted">
            Descripción: {{ element.description ? element.description : 'No hay descripción' }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="alert alert-warning alert-dismissible fade show" role="alert" v-else>
    <strong>404!</strong> No hay datos para mostrar.
  </div>
</template>
<script setup lang="ts">
import type { empresaInterface } from "@/views/Empresa/services/empresa.interfaces";
const props = defineProps<{
  empresa?: Array<empresaInterface>
}>()
</script>
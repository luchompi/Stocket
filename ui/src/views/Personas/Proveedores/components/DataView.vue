<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ props.data?.NIT }} - {{ props.data?.razonSocial }}</h5>
      <div class="row">
        <div class="col">
          <p>Ciudad: {{ props.data?.city }}</p>
          <p>Dirección: {{ props.data?.address }}</p>
          <p>Teléfono: {{ props.data?.phone }}</p>
          <p>Correo: {{ props.data?.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import type {Suppliers} from "@/views/Personas/Proveedores/services/proveedor.interfaces";

const props = defineProps<{
  data?: Suppliers | null
}>();
</script>
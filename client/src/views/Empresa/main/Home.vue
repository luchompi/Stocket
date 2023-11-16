<template>
  <div class="card-header">
    <div class=" d-flex align-items-center">
      <div class="text-center flex-grow-1 mb-0">
        <h6>Datos de empresa</h6>
      </div>
      <RouterLink :to="{ name: 'ActualizarEmpresa' }" class="btn btn-warning ml-auto" v-if="empresa.empresaData.NIT">
        Editar <i class="bi bi-pencil-square"></i>
      </RouterLink>
      <RouterLink :to="{ name: 'CrearEmpresa' }" type="button" class="btn btn-success" v-else>Añadir <i
          class="bi bi-plus-square"></i></RouterLink>
    </div>
  </div>
  <div class="card-body">
    <div class="row">
      <Animations :animation-data="Document" :style="{ width: '100px', height: '100px' }"
        v-if="empresa.empresaData.NIT" />
      <Animations :animation-data="Warning" :style="{ width: '100px', height: '100px' }" v-else />
      <div class="col">
        <div class="container" v-if="empresa.empresaData.NIT">
          <h5>Información de la entidad</h5>
          <p>NIT: {{ empresa.empresaData.NIT }}</p>
          <p>Nombre: {{ empresa.empresaData.name }} </p>
          <p>Descripción: {{ empresa.empresaData.description || 'No hay datos' }}</p>
          <p>Correo: {{ empresa.empresaData.email }}</p>
          <p>Teléfono: {{ empresa.empresaData.phone }}</p>
          <p>Dirección: {{ empresa.empresaData.address }}</p>
          <p>Sitio web: {{ empresa.empresaData.web || 'No hay datos' }}</p>
        </div>
        <div v-else>
          <span class="h4">No hay datos que mostrar</span>
          <p>Parece que no hay datos para esta categoría. Añada uno para empezar</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Document from '@/assets/Icons/Document.json'
import Warning from '@/assets/Icons/Warning.json'
import Animations from '@/components/Animations.vue';
import useEmpresaStore from '@/stores/empresa.store';

const empresa = useEmpresaStore()

document.title = "Empresa - Stocket"
</script>
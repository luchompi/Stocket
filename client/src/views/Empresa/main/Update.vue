<template>
  <div class="card-header">
    <div class=" d-flex align-items-center">
      <div class="text-center flex-grow-1 mb-0">
        <h6>Actualizar datos de empresa</h6>
      </div>
      <RouterLink :to="{ name: 'Empresa' }" class="btn btn-secondary ml-auto">
        Atrás <i class="bi bi-arrow-left"></i>
      </RouterLink>
    </div>
  </div>
  <div class="card-body">
    <h5 class="card-title">Ingrese los datos solicitados</h5>
    <div class="row">
      <Animations :animation-data="EditDocument" :style="{ width: '100px', height: '100px' }"/>
      <div class="col">
        <Form @on-update-empresa="updateData"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import EditDocument from "@/assets/Icons/EditDocument.json";
import Form from "@/views/Empresa/main/Form.vue";
import Animations from "@/components/Animations.vue";
import empresaStore from "@/stores/empresa.store";

const store = empresaStore()
const updateData = (data: any) => {
  store.actualizarEmpresa(data)
};
</script>
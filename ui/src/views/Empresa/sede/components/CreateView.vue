<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Ingrese los datos solicitados</h4>
      <div class="card-text">
        <FormData @onSave="onSave"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import FormData from './FormData.vue'
import type {sedes} from "@/views/Empresa/sede/services/sedes.interfaces";
import {storeSede} from "@/views/Empresa/services/empresa.services";

const url = useRouter()
const NIT = url.currentRoute.value.params.nit
const onSave = async (data: sedes) => {
  const response = await storeSede(data, NIT)
  if (response.status == 201) {
    url.push({name: 'sedes', params: {nit: NIT}})
  }
}
</script>
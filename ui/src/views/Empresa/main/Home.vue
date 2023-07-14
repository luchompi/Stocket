<template>
  <div class="card">
    <div class="card-header">
      <div class=" d-flex align-items-center">
        <div class="text-center flex-grow-1 mb-0">Empresas - Stocket <i class="bi bi-archive-fill"></i></div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <RouterLink :to="{ name: 'empresa-create' }" type="button" class="btn btn-primary" v-if="!queryset.length">
            Nuevo <i class="bi bi-plus-square"></i></RouterLink>
          <RouterLink :to="{ name: 'empresa-edit' }" type="button" class="btn btn-warning" v-if="queryset.length">Editar
            <i class="bi bi-pencil-square"></i>
          </RouterLink>
          <RouterLink :to="{ name: 'sedes', params: { nit: queryset[0].NIT } }" type="button" class="btn btn-info"
            v-if="queryset.length">Ver <i class="bi bi-search"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title">Datos de Empresa</h5>

      <div v-if="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <dataComponent :empresa="queryset" />
      </div>

    </div>

  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCompany } from '../services/empresa.services';
import dataComponent from './components/dataComponent.vue'
import type { empresaInterface } from '../services/empresa.interfaces';


const queryset = ref([] as empresaInterface[])
const loading = ref<boolean>(false)
const status = ref<boolean>(false)


onMounted(async () => {
  loading.value = true
  const response = await getCompany()
  queryset.value = response.data
  loading.value = false
  response.status === 200 ? status.value = true : status.value = false
})
</script>
<template>
  <div v-if="loading">
    Espere ...
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else-if="element">
    <h4>Datos de elemento</h4>
    <DataView :element="element"/>
  </div>
  <div v-else>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>404 </strong> No hay datos para mostrar
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Element} from '../services/elementos.interfaces';
import {getElementById} from '../services/elementos.services';
import {useRouter} from 'vue-router';
import DataView from './DataView.vue'

const url = useRouter()
const loading = ref<boolean>(false)
const element = ref({} as Element)

onMounted(async () => {
  loading.value = true
  await getElementById(url.currentRoute.value.params.placa)
      .then((Response) => {
        element.value = Response.data
      })
      .finally(() => {
        loading.value = false
      })
})
</script>
<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-12">
      <div class="card">
        <div class="card-body" v-if="loading">
          Espere ...
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="card-body" v-else>
          <h5 class="card-title">Seleccione las dependencias para la sede {{ sedeData.name }}</h5>
          <div class="card-text">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control" placeholder="Ingrese id o nombre de dependencia para buscar"
                aria-label="Username" aria-describedby="inputSearch" v-model="search" />
            </div>
            <StoreView :sede-id="sedeData.id" :dependencias="dependenciasData" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Dependencia } from "@/views/Empresa/dependencias/services/dependencias.interfaces";
import { useRouter } from "vue-router";
import { getSedeById } from "@/views/Empresa/services/empresa.services";
import { obtenerDependenciasParaSede, searchDependencias } from '../../dependencias/services/dependencias.services';
import StoreView from "@/views/Empresa/operations/components/StoreView.vue";

const search = ref<string>('')
const url = useRouter()
const loading = ref<boolean>(false)
const sedeData = ref<any>([]);
const dependenciasData = ref([] as Dependencia[])

const searchData = async () => {
  loading.value = true
  await searchDependencias(search.value)
    .then((Response) => {
      dependenciasData.value = Response.data
    })
    .catch((error) => {
      dependenciasData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const getData = async () => {
  loading.value = true
  const sedeResponse = await getSedeById(url.currentRoute.value.params.id)
  sedeData.value = sedeResponse.data
  const dependenciasResponse = await obtenerDependenciasParaSede(url.currentRoute.value.params.id)
  dependenciasData.value = dependenciasResponse.data
  loading.value = false
}

watchEffect(() => {
  if (search.value.length > 0) {
    searchData()
  } else {
    getData()
  }
})

</script>
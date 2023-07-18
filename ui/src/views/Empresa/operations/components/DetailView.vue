<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Seleccione las dependencias para la sede {{ sedeData.name }}</h5>
          <div class="card-text">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Ingrese id o nombre de dependencia para buscar"
                aria-label="Username"
                aria-describedby="inputSearch"
              />
            </div>
            <StoreView :sede-id="sedeData.id" :dependencias="dependenciasData"/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Dependencia} from "@/views/Empresa/dependencias/services/dependencias.interfaces";
import {useRouter} from "vue-router";
import {getSedeById} from "@/views/Empresa/services/empresa.services";
import {getDependencias} from '../../dependencias/services/dependencias.services';
import StoreView from "@/views/Empresa/operations/components/StoreView.vue";

const url = useRouter()
const loading = ref<boolean>(false)
const sedeData = ref<any>([]);
const dependenciasData = ref([] as Dependencia[])

onMounted(async () => {
  loading.value = true
  const sedeResponse = await getSedeById(url.currentRoute.value.params.id)
  sedeData.value = sedeResponse.data
  const dependenciasResponse = await getDependencias()
  dependenciasData.value = dependenciasResponse.data
  loading.value = false
})

</script>
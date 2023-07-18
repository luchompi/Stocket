<template>
  <div class="card">
    <div class="card-body">
      <h6 class="card-title">Seleccione una Sede para empezar</h6>
      <div class="card-text">
        <div v-if="loading">
          <div class="d-flex justify-content-center">
            Espere ...
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="!sedesList.length">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>404!</strong> No hay datos que mostrar.
            </div>
          </div>
          <div v-else>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in sedesList" :key="data.id">
                  <td>{{ data.id }}</td>
                  <td>{{ data.name }}</td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <RouterLink :to="{ name: 'sedes-detail', params: { nit: sesionStore().NIT, id: data.id } }" type="button"
                        class="btn btn-primary">Explorar <i class="bi bi-search"></i></RouterLink>
                      <RouterLink :to="{ name: 'operation-details', params: { id: data.id } }" type="button" class="btn btn-info">
                        Añadir <i class="bi bi-plus-circle"></i>
                      </RouterLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCompany, getSedes } from '../../services/empresa.services';
import type { sedes } from '../../sede/services/sedes.interfaces';
import { sesionStore } from '@/stores/sesion.store';

const sedesList = ref([] as sedes[])
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  const empresa = await getCompany()
  await getSedes(empresa.data[0].NIT)
    .then((Response) => {
      sedesList.value = Response.data
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
})
</script>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { getDependencias, deleteDependencia, searchDependencias } from '../services/dependencias.services';
import type { Dependencia } from '../services/dependencias.interfaces';
import Swal from 'sweetalert2';
import { errorValidator } from '@/hooks/errors.hooks';

const dependencias = ref([] as Dependencia[]);
const search = ref<string>('');
const loading = ref(false);

const searchData = async () => {
  loading.value = true
  await searchDependencias(search.value)
    .then((Response) => {
      dependencias.value = Response.data
    })
    .catch((error) => {
      dependencias.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const getData = async () => {
  loading.value = true;
  const response = await getDependencias();
  dependencias.value = response.data;
  loading.value = false;
}

const eliminarDependencia = async (id: any) => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro?',
    text: 'Esta acción no se puede revertir',
    showCancelButton: true,
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteDependencia(id)
        .then((Response) => {
          Swal.fire({
            icon: 'success',
            title: 'Datos eliminados',
            text: 'Los datos de la dependencia han sido eliminados correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          dependencias.value = dependencias.value.filter((element) => element.id !== id)
        })
        .catch((error) => {
          const resiever = errorValidator(error.response.data)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: resiever,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }

  })

}

watchEffect(() => {
  if (!search.value) {
    getData()
  } else {
    searchData()
  }
})

</script>

<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="input1"><i class="bi bi-search"></i></span>
    <input type="text" class="form-control" placeholder="Ingrese ID o nombre a buscar, Ej: sistemas ó 1"
      v-model="search" />
  </div>
  <div v-if="loading">
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Espere...
  </div>
  <div v-else>
    <div v-if="dependencias.length">
      <div v-for="element in dependencias" :key="element.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ element.name }}</h5>
            <p class="card-text text-muted">{{ element.description ? element.description : 'No hay información adicional'
            }}
            </p>
            <div class="btn-group" role="group" aria-label="Basic example">
              <RouterLink :to="{ name: 'dependencias-actualizar', params: { id: element.id } }" type="button"
                class="btn btn-warning">Editar</RouterLink>
              <button type="button" class="btn btn-danger" @click="eliminarDependencia(element.id)">Borrar</button>
            </div>
          </div>
        </div>
        <br>
      </div>
    </div>
    <div v-else>
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>404</strong> No hay datos que mostrar
      </div>
    </div>
  </div>
</template>


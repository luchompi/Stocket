<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { getDependenciaById, updateDependencia } from '../services/dependencias.services'
import FormViewComponent from "@/views/Empresa/dependencias/components/FormViewComponent.vue";
import Swal from 'sweetalert2';
import { errorValidator } from '@/hooks/errors.hooks';

const url = useRouter()
const loading = ref<boolean>(false)
const queryset = ref<any>([])


onMounted(() => {
  getData()
})

const getData = async () => {
  loading.value = true
  await getDependenciaById(url.currentRoute.value.params.id)
    .then(response => {
      queryset.value = response.data
    })
  loading.value = false
}

const onUpdateData = async (data: any) => {
  loading.value = true
  await updateDependencia(url.currentRoute.value.params.id, data)
    .then((Response) => {
      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados',
        text: 'Los datos de la dependencia han sido actualizados correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      getData()
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
    .finally(() => {
      loading.value = false
    })
}

</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class=" d-flex align-items-center mb-4">
        <h5 class="card-title text-center flex-grow-1 mb-0">Actualizar dependencia</h5>
        <RouterLink :to="{ name: 'dependencias' }" class="btn btn-secondary">Atrás <i class="bi bi-arrow-left"></i>
        </RouterLink>
      </div>
      <p class="card-text">Ingrese los datos a almacenar</p>
      <div v-if="loading">
        Espere ...
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col">
          <p>
            Nombre: {{ queryset.name }}
          </p>
          <p>
            Descripción: {{ queryset.description ? queryset.description : 'No hay descripción' }}
          </p>
        </div>
        <div class="col">
          <FormViewComponent :data="queryset" @onUpdateData="onUpdateData" />
        </div>
      </div>
    </div>
  </div>
</template>
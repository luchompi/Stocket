<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from "vue";
import { getSedeData } from "@/views/Empresa/services/empresa.services";

const data = ref<any>([])
const url = useRouter()

onMounted(async () => {
  const response = await getSedeData(url.currentRoute.value.params.nit, url.currentRoute.value.params.id)
  data.value = response.data
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class=" card-title d-flex align-items-center">
        <h4 class="text-center flex-grow-1 mb-0">Detalles de la sede</h4>
        <div class="btn-group" role="group" aria-label="Basic example">
          <RouterLink :to="{ name: 'sedes' }" type="button" class="btn btn-secondary">
            Atrás <i class="bi bi-arrow-left"></i></RouterLink>
        </div>
      </div>
      <div class="card-text">
        <div>
          Nombre: {{ data.name }}
        </div>
        <div>
          Dirección: {{ data.address }}
        </div>
        <div>
          Teléfono: {{ data.phone }}
        </div>
        <div>
          Email: {{ data.email }}
        </div>
        <div>
          Web: {{ data.web ? data.web : 'No existen datos' }}
        </div>
        <div>
          Descripción: {{ data.description ? data.description : 'No existen datos' }}
        </div>
      </div>
    </div>
  </div>
</template>

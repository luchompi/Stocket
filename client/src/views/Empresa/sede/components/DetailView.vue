<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from "vue";
import { getSedeData } from "@/views/Empresa/services/empresa.services";
import { getDependenciasBySede, deleteDependenciaBySede } from "@/views/Empresa/operations/services/operations.services";
import Swal from 'sweetalert2';

const data = ref<any>([])
const url = useRouter()
const sedeDep = ref<any>([])
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  const response = await getSedeData(url.currentRoute.value.params.nit, url.currentRoute.value.params.id)
  data.value = response.data
  loading.value = false
  const sededep = await getDependenciasBySede(url.currentRoute.value.params.id)
  sedeDep.value = sededep.data
})

const eliminarDependencia = async (sede_id:any,dependencia_id:any) =>{
  const response = await deleteDependenciaBySede(sede_id, dependencia_id)
  Swal.fire({
    icon:'success',
    title:'Dependencia removida',
    text:'La dependencia se ha removido de la sede exitosamente'
  }).then(()=>{
    sedeDep.value = sedeDep.value.filter((element:any)=>element.id !== dependencia_id)
  })
}
</script>

<template>
  <div v-if="loading">
    <div class="d-flex justify-content-center my-5">
      Espere ...
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div class="card" v-else>
    <div class="card-body">
      <div class=" card-title d-flex align-items-center">
        <h4 class="text-center flex-grow-1 mb-0">Detalles de la sede</h4>
        <div class="btn-group" role="group" aria-label="Basic example">
          <RouterLink :to="{ name: 'sedes' }" type="button" class="btn btn-secondary">
            Atrás <i class="bi bi-arrow-left"></i></RouterLink>
        </div>
      </div>
      <div class="card-text">
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Nombre: {{ data.name }}</h5>
    <div class="card-text">
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
    <div class="row" v-if="sedeDep.length">
      <div class="col">
        <br>
        <h6>Dependencias anexadas</h6>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="elements in sedeDep" :key="elements.id">
              <th scope="row">{{ elements.id }}</th>
              <td>{{ elements.dependencias[0].nombre }}</td>
              <td><button type="button" class="btn btn-danger" @click="eliminarDependencia(data.id,elements.id)">Remover <i class="bi bi-trash"></i> </button></td>
            </tr>            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

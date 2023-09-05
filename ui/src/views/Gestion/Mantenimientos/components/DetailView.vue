<template>
  <div v-if="loading">
      Espere ...
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
      <h5>Proceso con PID {{ url.currentRoute.value.params.id }}</h5>
    <article>
        <h4>Al elemento:</h4>
        <div v-for="(item,index) in queryset.elemento">
            <p>{{ item.referencia }} {{ item.modelo }}</p>
        </div>
        <h4>Se le abrió la historia de mantenimiento el {{queryset.timestamps}} por lo siguiente:</h4>
        <p>{{ queryset.descripcion }}</p>
        <p v-if="!!queryset.observaciones">Considerando las siguientes acciones realizadas</p>
        {{queryset.observaciones}}
        <hr>
        <p>El estado del mantenimiento es <strong>{{queryset.estado}}</strong></p>
    </article>
      <div class="btn-group" role="group" aria-label="Basic example" v-if="queryset.estado != 'Finalizado'">
        <RouterLink :to="{name:'fix-edit',params:{id:url.currentRoute.value.params.id}}" type="button" class="btn btn-warning">Cerrar historia <i class="bi bi-pencil"></i></RouterLink>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { obtenerMantenimiento } from '../services/mantenimiento.services';
import type { Maintenance } from '../services/mantenimiento.interfaces';

const queryset = ref({} as Maintenance)
const url = useRouter()
const loading = ref<boolean>(false)

const fetchData = async () => {
    loading.value = true
    const response = await obtenerMantenimiento(url.currentRoute.value.params.id)
    queryset.value = response.data
    loading.value = false
}

onMounted(()=>{
    fetchData()
})
</script>
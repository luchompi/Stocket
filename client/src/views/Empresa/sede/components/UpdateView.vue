<template>
    <div class=" card-title d-flex align-items-center">
        <h4 class="text-center flex-grow-1 mb-0">Actualizar datos de sede</h4>
        <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{ name: 'sedes' }" type="button" class="btn btn-secondary">
                Atrás <i class="bi bi-arrow-left"></i></RouterLink>
        </div>
    </div>
    <div class="card-body">
        <h6>Ingrese los datos solicitados</h6>
        <div class="row" v-if="loading">
            <div class="col">
                Espere ...
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col">
                <h6>Estos son los datos en almacenados en sistema</h6>
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
            <div class="col">
                <FormData :data="data" @onUpdate="onUpdate" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getSedeData, updateSede } from '../../services/empresa.services';
import FormData from './FormData.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const url = useRouter()
const data = ref<any>([])
const loading = ref<boolean>(false)

onMounted(async () => {
    loading.value = true
    const response = await getSedeData(url.currentRoute.value.params.nit, url.currentRoute.value.params.id)
    data.value = response.data
    loading.value = false
})

const onUpdate = async(data: any) => {
    const response = await updateSede(data,url.currentRoute.value.params.nit, url.currentRoute.value.params.id)
    if(response.status === 200){
        Swal.fire({
            icon: 'success',
            title: 'Datos actualizados',
            text: 'Los datos de la sede han sido actualizados correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        url.push({name:'sedes-detail',params:{nit:url.currentRoute.value.params.nit,id:url.currentRoute.value.params.id}})
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al actualizar los datos de la sede',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
</script>
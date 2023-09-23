<template>
    <div v-if="loading">
        Espere ...
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>

    </div>
    <div v-else>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
            <input type="text" class="form-control" placeholder="Ingrese PID o placa de elemento a buscar..." aria-label="Username"
                aria-describedby="inputSearch" v-model="search" />
        </div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">PID</th>
                    <th scope="col">Elemento</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in queryset" :key="item.PID">
                    <th scope="row">{{ item.PID }}</th>
                    <td v-for="index in item.elemento">
                        <span>Placa: {{ index.placa }} - {{ index.referencia }} {{ index.modelo }}</span>
                    </td>
                    <td>{{ item.estado }}</td>
                    <td>
                        <RouterLink :to="{ name: 'fix-details', params: { id: item.PID } }" type="button" class="btn btn-primary">
                            Ver <i class="bi bi-search"></i></RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { obtenerMantenimientos,buscarMantenimiento } from '../services/mantenimiento.services';
import type { Maintenance } from '../services/mantenimiento.interfaces';

const queryset = ref([] as Maintenance[])
const search = ref<string>('')
const loading = ref<boolean>(false)

const searchMaintenance = async () => {
    loading.value = true
    await buscarMantenimiento(search.value)
    .then((Response)=>{
        queryset.value = Response.data
    })
    loading.value = false
}

const getMaintenance = async () => {
    loading.value = true
    await obtenerMantenimientos()
        .then((Response) => {
            queryset.value = Response.data
        })
        .catch((error) => {
            queryset.value = []
        })
        .finally(() => { loading.value = false })
}

watchEffect(() => {
    search.value.length != 0 ? searchMaintenance() : getMaintenance()
})

</script>
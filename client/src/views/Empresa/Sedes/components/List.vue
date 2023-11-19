<template>
    <div class=" d-flex align-items-center">
        <div class="flex-grow-1 mb-0">
            <h3>Listado de sedes</h3>
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{ name: 'SedeCreate' }" type="button" class="btn btn-success ml-auto">
                Crear
                <i class="bi bi-plus"></i>
            </RouterLink>
        </div>
    </div>
    <br />
    <div class="row">
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
            <input type="text" v-model="search" class="form-control" placeholder="Ingrese nombre de sede a buscar"
                aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <Animations :animation-data="store.sedes.length ? Home : Warning" :style="{ width: '200px', height: '200px' }" />

        <div class="col" v-if="store.sedes.length">
            <h6 class="text-muted">Se le mostrarán los ultimos 5 registros creados</h6>
            <div class="list-group">
                <div v-for="sede in store.sedes.slice(0, 5)" class="list-group-item list-group-item-action">
                    <DataCard :data="sede" />
                </div>
            </div>

        </div>
        <div class="col" v-else>
            <h5>No hay sedes en sistema</h5>
        </div>
    </div>
</template>
<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import Warning from '@/assets/Icons/Warning.json'
import Home from '@/assets/Icons/Home.json'
import useSedeStore from '@/stores/sedes.store';
import DataCard from './DataCard.vue';
import { ref, watchEffect } from 'vue';
const store = useSedeStore();

const search = ref<string>('')

watchEffect(() => {
    store.buscarSede(search.value)
})

</script>

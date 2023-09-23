<script setup lang="ts">
import { ref, onUnmounted, watchEffect } from 'vue'
import { asignacionStore } from '../services/asignacion.store'
import { findElementsToAsign } from '../services/asignacion.services'
import StoreView from './StoreView.vue';
import type { Element } from '@/views/Inventario/Elementos/services/elementos.interfaces';
const store = asignacionStore()
onUnmounted(() => {
    store.setEmployee(null)
    store.reset()
})
const choosedOption = ref<string>('default')
const search = ref<string>('')
const queryset = ref([] as Element[])

const filterElements = async () => {
    if (choosedOption.value != 'default') {
        const response = await findElementsToAsign({ 'param': choosedOption.value, 'value': search.value })
        queryset.value = response.data
    }
}

const fetchAll = async () => {
    const response = await findElementsToAsign({ 'param': 'all' })
    queryset.value = response.data
}
watchEffect(() => {
    choosedOption.value && search.value ? filterElements() : fetchAll()
})
</script>
<template>
    <div class="row">
        <h4>Crear nueva asignación</h4>
        <h5>A nombre de: {{ store.employee?.iden }} - {{ store.employee?.first_name }} {{ store.employee?.last_name }}</h5>
        <div class="input-group mb-3">
            <span class="input-group-text" id="input1">
                <select class="form-select" v-model="choosedOption">
                    <option value="default">Ingrese un criterio de búsqueda</option>
                    <option value="marca">Marca</option>
                    <option value="categoria">Categoría</option>
                    <option value="modelo">Modelo</option>
                    <option value="placa">Placa</option>
                </select>
            </span>
            <input type="text" class="form-control" placeholder="Ingrese valor a buscar..." aria-label="Username"
                aria-describedby="input1" v-model="search" />
        </div>
    </div>
    <div class="row" v-if="queryset.length">
        <!---Elementos-->
        <div class="col">
            <div v-for="item in queryset" :key="item.placa">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Placa : {{ item.placa }}</h5>
                        <p class="card-text"> {{ item.referencia }} {{ item.modelo }}</p>
                        <p class="text-muted">{{ item.estado }}</p>
                        <button @click="store.setElements(item)" class="btn btn-primary">Asignar <i
                                class="bi bi-arrow-right"></i></button>
                    </div>
                </div>
                <br>
            </div>
        </div>
        <!---Store-->
        <div class="col">
            <StoreView />
        </div>
    </div>
</template>
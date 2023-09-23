<template>
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
        <input type="text" class="form-control" placeholder="Ingrese placa de elemento a buscar" aria-label="Username"
            v-model="search" aria-describedby="inputSearch" />
    </div>
    <div v-if="loading">
        Espere ...
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else-if="finded">
        <ul class="list-group" v-for="item in queryset">
            <li class="list-group-item">{{ item.placa }} - {{ item.referencia }} {{ item.modelo }} <button
                    @click="setElement(item)" class="btn btn-success">Seleccionar<i class="bi bi-plus"></i></button></li>
        </ul>
        <div class="alert alert-primary alert-dismissible fade show" role="alert" v-if="element?.placa">
            <strong>{{ element?.placa }}</strong> {{ element?.referencia }} {{ element?.modelo }} seleccionado
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click="removeElement()"></button>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>404 </strong> No se encontró el elemento.
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { findElementByPlaca } from '@/views/Inventario/Elementos/services/elementos.services';
import type { Element } from "@/views/Inventario/Elementos/services/elementos.interfaces";

const emits = defineEmits(['sendElement'])

const queryset = ref([] as Element[])
const search = ref<string>('')
const loading = ref<boolean>(false)
const finded = ref<boolean>(false)
const element = ref({} as Element | null)

const setElement = (item: Element) => {
    element.value = item
    queryset.value = []
    search.value = ''
    emits('sendElement', element.value)
}

const removeElement = () => {
    element.value = {} as Element
    emits('sendElement', {})
}

const searchElement = async () => {
    await findElementByPlaca(search.value)
        .then((Response) => {
            queryset.value = Response.data
            finded.value = true
        }).catch((error) => {
            queryset.value = []
            finded.value = false
        })
        .finally(() => { loading.value = false })
}

watchEffect(() => {
    if (search.value) {
        loading.value = true
        searchElement()
    }
})
</script>
<template>
    <h6>Placa: {{ element.placa }}</h6>
    <h6>Referencia {{ element.referencia }} {{ element.modelo }}</h6>
    <p>Estado: {{ element.estado }}</p>
    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-danger">Declarar baja</button>
    </div>
</template>

<script setup lang="ts">
import type { Element } from '@/views/Inventario/Elementos/services/elementos.interfaces';
const props = defineProps<{
    element: Element
}>()
</script>
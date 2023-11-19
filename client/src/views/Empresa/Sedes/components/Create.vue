<script setup lang="ts">
import Form from './Form.vue'
</script>

<template>
    <div class=" d-flex align-items-center">
        <div class="flex-grow-1 mb-0">
            <h3>Crear sede nueva</h3>
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
            <RouterLink :to="{ name: 'SedeList' }" type="button" class="btn btn-secondary ml-auto">
                Volver
                <i class="bi bi-arrow-left"></i>
            </RouterLink>
        </div>
    </div>
    <h5>Ingrese los datos solicitados</h5>
    <Form />
</template>

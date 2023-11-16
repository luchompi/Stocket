<template>
    <div class="card-header">
        <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-0">
                <h6>Crear nueva empresa</h6>
            </div>
            <RouterLink :to="{ name: 'Empresa' }" class="btn btn-secondary ml-auto">
                Atrás <i class="bi bi-arrow-left"></i>
            </RouterLink>
        </div>
    </div>
    <div class="card-body">
        <h5 class="card-title">Ingrese los datos solicitados</h5>
        <div class="row">
            <Animations :animation-data="EditDocument" :style="{ width: '100px', height: '100px' }" />
            <div class="col">
                <Form @on-create-empresa="saveData" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Form from './Form.vue'
import Animations from '@/components/Animations.vue';
import EditDocument from '@/assets/Icons/EditDocument.json'
import type { Company } from '../services/empresa.interfaces';
import empresaStore from "@/stores/empresa.store";

const sesion = empresaStore()

const saveData = (data: Company) => {
    sesion.crearEmpresa(data)
}

document.title = "Crear empresa - Stocket"
</script>
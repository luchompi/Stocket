<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { getAsignacion, getElementsinAsignment } from "../services/asignacion.services";
import type { Asignation, AsignationDetail } from "../services/asignacion.interfaces";
import html2pdf from 'html2pdf.js';

const asignacion = ref({} as Asignation)
const funcionario = ref([] as any)
const details = ref([] as AsignationDetail[])
const url = useRouter()

const getElements = async () => {
    const response = await getElementsinAsignment(url.currentRoute.value.params.id)
    details.value = response.data
}
const getData = async () => {
    const response = await getAsignacion(url.currentRoute.value.params.id)
    asignacion.value = response.data
    funcionario.value = response.data.funcionario
    getElements()
}

const generarPDF = () => {
    const element = document.getElementById('pdf')
    const opt = {
        margin: 0.5,
        filename: 'asignación ' + url.currentRoute.value.params.id + '.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().from(element).set(opt).save()
    url.push({ name: 'asig-detail', params: { id: url.currentRoute.value.params.id } })
}

onMounted(() => {
    getData()
    setTimeout(generarPDF, 500)
})
document.title = 'Reporte de asignación - Stocket'
</script>
<template>
    <div class="container" id="pdf">
        <h2>Reporte de asignaciones</h2>
        <p>Siendo las {{ asignacion.timestamps }} en la ciudad de Riohacha, al funcionario {{
            funcionario[0]?.first_name }}
            {{ funcionario[0]?.last_name }} identificado con documento de identidad No. {{
                funcionario[0]?.iden }} le fueron asignados los siguientes elementos
            bajo <strong>PID {{ url.currentRoute.value.params.id }}</strong></p>
        <div v-for="detail in details" :key="detail.id">
            <div v-for="item in detail.elementos">
                <div class="card">
                    <div class="card-body">
                        <h6>Placa: {{ item.placa }}</h6>
                        <h6>Referencia {{ item.referencia }} {{ item.modelo }}</h6>
                        <p>Estado: {{ item.estado }}</p>
                    </div>
                </div>
            </div>
            <br>
        </div>
        <p>Para mayor información, contacte al administrador del sistema</p>
    </div>
</template>
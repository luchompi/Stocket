<script setup lang="ts">
import type { Employee } from '@/views/Personas/Funcionarios/services/funcionarios.interfaces';
import { onMounted, ref } from 'vue';
import { obtenerCertificadoAsignacion } from '../services/certificacion.services';
import html2pdf from 'html2pdf.js';
import type { Asignation } from '@/views/Gestion/Asignaciones/services/asignacion.interfaces';

const data = ref([] as Asignation[])

const props = defineProps<{
    employee: Employee
}>()


const generarPDF = () => {
    const element = document.getElementById('pdf')
    const opt = {
        margin: 0.5,
        filename: 'report.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().from(element).set(opt).save()
}

const getInfo = async () => {
    const response = await obtenerCertificadoAsignacion(props.employee.iden)
    data.value = response.data
}

onMounted(() => {
    getInfo()
})
</script>

<template>
    <h2>Consulta de usuario <button class="btn btn-primary" @click="generarPDF" v-if="!data.length">Imprimir <i
                class="bi bi-printer"></i></button></h2>
    <div id="pdf">
        <h3>Reporte de paz y salvo</h3>
        <p>
            Siendo las {{ new Date().toLocaleTimeString() }} del {{ new Date().toLocaleDateString() }}, el sistema de
            gestión e inventario de elementos TI "Stocket" reporta,
            que al funcionario {{ props.employee.first_name }} {{ props.employee.last_name }} identificado con cédula de
            ciudadanía {{ props.employee.iden }}:
        </p>
        <div v-if="data.length">
            <h5>Posee asignaciones a su nombre</h5>
            <table class="table table-striped table-hober">
                <thead>
                    <tr>
                        <th scope="col">PID</th>
                        <th scope="col">Fecha de asignación</th>
                        <th scope="col">Procesado por</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data">
                        <td>{{ item.id }}</td>
                        <td>{{ item.timestamps }}</td>
                        <td>{{ item.user }}</td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div v-else>
            <h5><strong>No posee elementos asignados.</strong></h5>
        </div>
        <p>Para mayor información, contacte a la oficina de sistemas</p>
    </div>
</template>

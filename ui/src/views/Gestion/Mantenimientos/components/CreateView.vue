<template>
    <elementsContainer @sendElement="sendElement" />
    <fromContainer v-if="element.placa" @sendData="sendData" />
</template>
<script setup lang="ts">
import elementsContainer from './containers/elementsContainer.vue';
import fromContainer from './containers/formContainer.vue';
import { ref } from 'vue';
import type { Element } from "@/views/Inventario/Elementos/services/elementos.interfaces";
import Swal from 'sweetalert2';
import { crearMantenimiento } from '../services/mantenimiento.services';
import { useRouter } from 'vue-router';
const element = ref({} as Element)
const url = useRouter()
const sendElement = (data: any) => {
    element.value = data
}

const sendData = async (data: any) => {
    await crearMantenimiento(element.value.placa, {details:data})
        .then((Response) => {
            Swal.fire({
                icon: 'success',
                title: 'Historia de mantenimiento creada',
                showConfirmButton: false,
                timer: 1500
            })
            url.push({ name: 'fix-list' })
        })

}
</script>
<template>
<formContainer :data="element" @updateData="updateData"/>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import {useRouter} from "vue-router";
import formContainer from './containers/formContainer.vue';
import {actualizarMantenimiento, obtenerMantenimiento} from "@/views/Gestion/Mantenimientos/services/mantenimiento.services";
import type {Maintenance} from "@/views/Gestion/Mantenimientos/services/mantenimiento.interfaces";

const url = useRouter()
const element = ref({} as Maintenance)

onMounted(async()=>{
    element.value = (await obtenerMantenimiento(url.currentRoute.value.params.id)).data
})

const updateData = async (data:any) =>{
  const response = await actualizarMantenimiento(url.currentRoute.value.params.id,data)
}
</script>
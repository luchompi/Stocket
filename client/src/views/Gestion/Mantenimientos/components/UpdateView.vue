<template>
  <formContainer :data="element" @updateData="updateData"/>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import formContainer from './containers/formContainer.vue';
import {
  actualizarMantenimiento,
  obtenerMantenimiento
} from "@/views/Gestion/Mantenimientos/services/mantenimiento.services";
import type {Maintenance} from "@/views/Gestion/Mantenimientos/services/mantenimiento.interfaces";
import Swal from "sweetalert2";

const url = useRouter()
const element = ref({} as Maintenance)

onMounted(async () => {
  element.value = (await obtenerMantenimiento(url.currentRoute.value.params.id)).data
})

const updateData = async (data: any) => {
  await actualizarMantenimiento(url.currentRoute.value.params.id, data)
      .then((Response) => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha cerrado la historia de forma satisfactoria',
          showConfirmButton: false,
          timer: 1500
        })
        url.push({name: 'fix-list'})
      })
}
</script>
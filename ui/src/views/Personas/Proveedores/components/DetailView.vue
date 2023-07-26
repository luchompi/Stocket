<template>
  <h4>Datos de proveedor</h4>
  <DataView :data="queryset"/>

</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {onMounted, ref} from "vue";
import DataView from "./DataView.vue";
import {getProveedoresById} from "@/views/Personas/Proveedores/services/proveedor.services";
import type {Suppliers} from "@/views/Personas/Proveedores/services/proveedor.interfaces";

const url = useRouter()
const queryset = ref({} as Suppliers)
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  await getProveedoresById(url.currentRoute.value.params.nit)
      .then((Response) => {
        queryset.value = Response.data
      })
      .finally(() => {
        loading.value = false
        console.log(queryset.value)
      })
})
</script>
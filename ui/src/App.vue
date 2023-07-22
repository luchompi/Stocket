<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import {ref,onMounted,watchEffect} from 'vue'
import { sesionStore } from './stores/sesion.store';
const dateTime = ref<string>('')
const sesion = sesionStore()
const company = ref<boolean>(false)
onMounted(()=>{
  setInterval(()=>{
    dateTime.value = new Date().toLocaleString('es-co')
    sesion.incrementTimer()
    watchEffect(()=>{
      company.value = !!sesion.NIT
    })
  },1000)
})

</script>

<template>
<div @mousemove="sesion.refreshAccessToken">
  <Navbar :dateTime="dateTime"/>
  <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="sesion.isLogged && (sesion.UserData[0]?.groups?.includes('Administradores') || sesion.UserData[0]?.is_superuser)">
    <strong>¡Atención!</strong> Esta cuenta posee permisos de administrador. Tenga cuidado con los cambios que realice, ya que no se pueden deshacer.
  </div>
  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="!company && sesion.isLogged">
    <strong>¡Alerta!</strong> No hay datos de la empresa. Por favor, comuníquese con el administrador del sistema para que los ingrese.
  </div>
  <RouterView />
</div>
</template>



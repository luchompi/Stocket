<script setup lang="ts">
import {RouterView} from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import {onMounted, ref } from 'vue'
import {sesionStore} from './stores/sesion.store';
import {comprobarRolUsuario} from '@/hooks/permissions.hooks'

const comprobarRol = comprobarRolUsuario()
const dateTime = ref<string>('')
const sesion = sesionStore()
onMounted(() => {
  setInterval(() => {
    dateTime.value = new Date().toLocaleString('es-co')
    sesion.incrementTimer()
  }, 1000)
})
</script>

<template>
  <div @mousemove="sesion.refreshAccessToken">
    <Navbar :dateTime="dateTime"/>
    <div class="alert alert-warning alert-dismissible fade show" role="alert"
         v-if="sesion.isLogged && (sesion.UserData[0]?.groups.includes('Administradores') || sesion.UserData[0]?.groups.includes('Administrador') || sesion.UserData[0]?.is_superuser)">
      <strong>¡Atención!</strong> Esta cuenta posee permisos de administrador. Tenga cuidado con los cambios que
      realice,
      ya que no se pueden deshacer.
    </div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-else-if="sesion.isLogged && !sesion.UserData[0]?.groups[0]">
      <strong>Error!</strong> Usted no tiene permisos para realizar tareas en el sistema, contacte al administrador para mayor información.
    </div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="!sesion.NIT && sesion.isLogged ">
      <strong>¡Alerta!</strong> No hay datos de la empresa. Por favor, comuníquese con el administrador del sistema para
      que los ingrese.
    </div>

    <RouterView/>
  </div>
</template>



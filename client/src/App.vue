<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {  ref } from 'vue'
import Navbar from './components/Navbar.vue';
import useSesionStore from "@/stores/sesion.store";
import {RefreshSesion} from "@/middleware/sesion.middleware";
const dateTime = ref<string>('')
const store = useSesionStore()


setInterval(() => {
  dateTime.value = new Date().toLocaleString()
  store.isAuth ? store.incrementTimer() : null
  console.log(store.timer)
}, 1000)

</script>

<template>
  <div @mouseenter="RefreshSesion()">
    <Navbar :dateTime="dateTime" />
  <div class="row justify-content-md-center">
    <RouterView />
  </div>
  </div>
</template>

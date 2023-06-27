<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import {ref,onMounted} from 'vue'
const dateTime = ref<string>('')

onMounted(()=>{
  setInterval(()=>{
    dateTime.value = new Date().toLocaleString('es-co')
  },1000)
})
</script>

<template>
 


  <Navbar :dateTime="dateTime"/>
  <RouterView />
</template>



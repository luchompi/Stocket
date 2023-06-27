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
  <div class="row justify-content-md-center">
    <div class="col col-lg-10">
      <div class="card">
        <div class="card-header">Stocket <i class="bi bi-archive-fill"></i></div>
        <div class="card-body">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>



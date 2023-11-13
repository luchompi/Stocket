<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue';
const dateTime = ref<string>('')

setInterval(() => {
  dateTime.value = new Date().toLocaleString()
}, 1000)

</script>

<template>
  <Navbar :dateTime="dateTime" />
  <div class="row justify-content-md-center">
    <RouterView />
  </div>
</template>

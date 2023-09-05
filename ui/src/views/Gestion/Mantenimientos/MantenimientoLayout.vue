<script setup lang="ts">
import { loginRequired } from '@/hooks/sesion.hook';
import { watchEffect } from 'vue';

watchEffect(()=>{
  loginRequired()
})
</script>

<template>
<div class="row justify-content-md-center">
    <div class="card">
      <div class="card-header">
        <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-0">Mantenimientos <i class="bi bi-wrench-adjustable-circle"></i></div>
            <div class="btn-group" role="group" aria-label="Basic example">
              <RouterLink :to="{name:'fix-list'}" type="button" class="btn btn-primary">Listar <i class="bi bi-list-check"></i></RouterLink>
              <RouterLink :to="{name:'fix-new'}" type="button" class="btn btn-success">Nuevo <i class="bi bi-tools"></i></RouterLink>
            </div>
          </div>
      </div>
      <div class="card-body">
        <div class="card-text">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
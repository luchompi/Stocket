<script setup lang="ts">
import { loginRequired } from '@/hooks/sesion.hook';
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const url = useRouter()

watchEffect(()=>{
  loginRequired()
})
</script>

<template>
<div class="row justify-content-md-center">
    <div class="card">
      <div class="card-body">
        <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-auto"><h5>Mantenimientos <i class="bi bi-wrench-adjustable-circle"></i></h5>
            </div>
            <div class="btn-group mb-auto" role="group" aria-label="Basic example">
              <RouterLink :to="{name:'fix-list'}" type="button" class="btn btn-primary" v-if="url.currentRoute.value.name != 'fix-list'">Listar <i class="bi bi-list-check"></i></RouterLink>
              <RouterLink :to="{name:'fix-new'}" type="button" class="btn btn-success" v-if="url.currentRoute.value.name != 'fix-new'">Nuevo <i class="bi bi-tools"></i></RouterLink>
            </div>
          </div>
          <br>
        <div class="card-text">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
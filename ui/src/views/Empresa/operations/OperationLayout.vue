<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Operaciones - Añadir dependencias a sedes</h4>
          <div class="card-text">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {loginAndAdminRequired} from '@/hooks/sesion.hook'
import {onMounted, watchEffect} from 'vue';

onMounted(() => {
  watchEffect(() => {
    loginAndAdminRequired()
  })
})
</script>
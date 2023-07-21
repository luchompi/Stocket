<script setup lang="ts">
import { loginRequired } from '@/hooks/sesion.hook';
import { watchEffect } from 'vue';

watchEffect(() => {
  loginRequired();
})

</script>

<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-9">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Personas - Stocket <i class="bi bi-person-fill"></i></h4>
          <div class="card-text">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
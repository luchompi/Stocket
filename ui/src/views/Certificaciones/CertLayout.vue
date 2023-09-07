<script setup lang="ts">
import { loginRequired } from '@/hooks/sesion.hook';
import { watchEffect } from 'vue';

watchEffect(() => {
  loginRequired();
});
</script>

<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-10">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Certificaciones <i class="bi bi-file-earmark-bar-graph"></i></h4>
          <div class="card-text">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

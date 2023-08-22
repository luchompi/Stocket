<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-10">
      <div class="card">
        <div class="card-header">Gestión <i class="bi bi-tools"></i></div>
        <div class="card-body">
          <h5 class="card-title">Gestión de operaciones</h5>
          <div class="card-text">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {watchEffect} from "vue";
import {loginRequired} from "@/hooks/sesion.hook";

watchEffect(() => {
  loginRequired()
})
</script>
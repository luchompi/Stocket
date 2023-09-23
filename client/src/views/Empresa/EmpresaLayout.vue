<template>
  <div class="row justify-content-md-center mb-4">
    <div class="col col-md-10">
      <div class="card">
        <div class="card-header">
          <div class=" d-flex align-items-center">
            <div class="h5 text-center flex-grow-1 mb-0">Empresas - Stocket <i
                class="bi bi-archive-fill"></i>
            </div>
          </div>
          <div class="card-body">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {loginAndAdminRequired} from '@/hooks/sesion.hook';
import {onBeforeMount} from 'vue';

onBeforeMount(() => {
  loginAndAdminRequired();
})
</script>
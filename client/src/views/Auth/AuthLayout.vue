<template>
  <div class="col col-lg-6">
    <div class="card">
      <div v-if="sesion.loadingStatus">
        <div class="card-body">
          <Loading />
        </div>
      </div>
      <router-view v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import Loading from '@/components/Loading.vue';
import { RedirectIfAuth } from '@/middleware/auth.middleware'
import useSesionStore from '@/stores/sesion.store';

const sesion = useSesionStore()

RedirectIfAuth()
</script>
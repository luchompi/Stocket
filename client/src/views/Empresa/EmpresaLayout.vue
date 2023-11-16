<template>
  <div class="col col-lg-10">
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
import { RedirectIfNotAuth } from "@/middleware/auth.middleware";
import useSesionStore from "@/stores/sesion.store";
import Loading from "@/components/Loading.vue";
const sesion = useSesionStore();
RedirectIfNotAuth()
</script>
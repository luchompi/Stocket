<script setup lang="ts">
import {RouterLink} from 'vue-router';
</script>
<template>
  <div class="row justify-content-md-center">
    <div class="col col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-0">
              <h6 class="card-title">Elementos <i class="bi bi-laptop"></i> <i class="bi bi-pc-display"></i></h6>
            </div>
            <RouterLink :to="{name:'elementos-create'}" type="button" class="btn btn-success ml-auto"><i
                class="bi bi-plus-square"></i></RouterLink>
          </div>
        </div>
        <div class="card-body">
          <div class="card-text">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
<script setup lang="ts">

</script>

<template>
  <div class="row justify-content-md-center">
    <div class="card-deck">
      <div class="card">
        <div class="card-header">
          <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 "><h6>Bajas</h6> <i class="bi bi-card-list"></i></div>
            <div class="btn-group ml-auto" role="group" aria-label="Basic example">
              <RouterLink :to="{ name: 'bajas-list' }" class="btn btn-primary">Listado <i
                  class="bi bi-list-check"></i></RouterLink>
              <RouterLink :to="{name:'bajas-nuevo'}" class="btn btn-success">Crear <i class="bi bi-plus"></i>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="card-body">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>


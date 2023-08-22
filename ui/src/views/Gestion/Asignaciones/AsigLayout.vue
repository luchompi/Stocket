<template>
  <div class="card">
    <div class="card-header">
      <div class=" d-flex align-items-center">
        <div class="text-center flex-grow-1 "><h6>Asignaciones</h6> <i class="bi bi-card-list"></i></div>
        <div class="btn-group ml-auto" role="group" aria-label="Basic example">
          <RouterLink :to="{ name: 'asig-list' }" class="btn btn-primary">Listado <i
              class="bi bi-list-check"></i></RouterLink>
          <RouterLink :to="{ name: 'categorias-nuevo' }" class="btn btn-success">Nuevo <i
              class="bi bi-person-plus"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-text">
        <router-view/>
      </div>
    </div>
  </div>
</template>
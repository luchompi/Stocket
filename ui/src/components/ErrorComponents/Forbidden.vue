<script setup lang="ts">

</script>

<template>
<div class="row justify-content-md-center">
    <div class="col col-lg-6">
        <div class="card">
          <div class="card-header">Acceso Denegado - 401</div>
          <div class="card-body">
            <h5 class="card-title">Houston, tenemos un problema...</h5>
            <p class="card-text">
                Usted no tiene permisos para realizar esta tarea, por favor contacte con el administrador del sistema.
            </p>
            <RouterLink :to="{name:'home'}" type="button" class="btn btn-primary">
                Sácame de aquí
            </RouterLink>
          </div>
        </div>
    </div>
</div>
</template>

¿
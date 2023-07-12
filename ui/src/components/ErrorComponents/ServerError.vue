<script setup lang="ts">

</script>

<template>
    <div class="row justify-content-md-center">
        <div class="col col-lg-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Control de misión... ¡Respondan, cambio!</h5>
                <p class="card-text">
                    No se ha podido conectar al servidor, por favor contacte con el administrador del sistema e intente mas tarde.
                </p>
                <RouterLink :to="{name:'home'}" type="button" class="btn btn-primary">Sácame de aquí</RouterLink>
              </div>
            </div>
        </div>
    </div>

</template>


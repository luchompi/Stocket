<template>
  <div class="row justify-content-md-center">
    <div class="card">
      <div class="card-header">
        <div class=" d-flex align-items-center">
          <div class="text-center flex-grow-1 ">
            <h5>Traspasos</h5> <i class="bi bi-sync"></i>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-text">
          <article>
            <h5>Operación de traspaso</h5>
            <p>A continuación, el proceso de asignación con PID {{ useRouter().currentRoute.value.params.id }}
              seleccionado será reasignado completamente, seleccione el funcionario a quien se le reasignarán todos los
              elementos.</p>
          </article>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

</script>
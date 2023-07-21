<script setup lang="ts">
import FormView from "@/views/Personas/Funcionarios/components/FormView.vue";

const onSaveData = () => {
  console.log("onSave");
}
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Crear Funcionario</h4>
      <p class="card-text">Ingrese los datos solicitados.</p>
      <FormView @onSaveData="onSaveData"/>
    </div>
  </div>

</template>
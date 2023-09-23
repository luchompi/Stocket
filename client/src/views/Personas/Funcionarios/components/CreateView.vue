<script setup lang="ts">
import FormView from "@/views/Personas/Funcionarios/components/FormView.vue";
import type { Employee } from "../services/funcionarios.interfaces";
import { saveEmployee } from "../services/funcionarios.services";
import { errorValidator } from "@/hooks/errors.hooks";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const url = useRouter()

const onSaveData = async(data:Employee) => {  
  await saveEmployee(data)
  .then((Response)=>{
    Swal.fire({
      icon: 'success',
      title: 'Funcionario creado',
      showConfirmButton: false,
      timer: 1500
    })
    url.push({name:'funcionarios'})
  })
  .catch((error)=>{
    const reciever = errorValidator(error.response.data)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: reciever,
    })
  })
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
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { getEmployeeById } from "@/views/Personas/Funcionarios/services/funcionarios.services";
import type { Employee } from '../services/funcionarios.interfaces';


const props = defineProps<{
  data?: Employee | null
}>()

const employee = ref<any | null>(null)

const url = useRouter()
const loading = ref<boolean>(false)

onMounted(async () => {
  loading.value = true
  if (props.data) {
    employee.value = props?.data
  }
  else {
    const iden = url.currentRoute.value.params.id
    await getEmployeeById(iden)
      .then((Response) => {
        employee.value = Response.data
      })
  }
  loading.value = false
})
</script>

<template>
  <div class="container">
    <div v-if="loading">
      Espere ...
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body">
        <h5 class="card-title">Datos de funcionario</h5>
        <div class="card-text">
          <h3>{{ employee?.iden }} - {{ employee?.first_name }} {{ employee?.last_name }}</h3>
          <div class="row">
            <div class="col">
              <p><strong>Correo electrónico: </strong>{{ employee?.email }}</p>
              <p><strong>Teléfono: </strong>{{ employee?.phone }}</p>
              <p><strong>Dirección: </strong>{{ employee?.address }}</p>
              <p><strong>Estado: </strong>{{ employee?.status }}</p>
            </div>
            <div class="col">
              <p><strong>Sede: </strong>{{ employee?.sede ? employee?.sede : 'No hay datos'}}</p>
              <p><strong>Cargo: </strong>{{ employee?.job }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
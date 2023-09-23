<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router';
import type {Employee} from '../services/funcionarios.interfaces';
import {getEmployeeById, updateEmployee} from '../services/funcionarios.services';
import DetailView from './DetailView.vue';
import FormView from './FormView.vue';
import Swal from 'sweetalert2';

const url = useRouter()

const loading = ref<boolean>(false)
const employee = ref<Employee | null>(null)

onMounted(async () => {
  loading.value = true
  await getEmployeeById(url.currentRoute.value.params.id)
      .then((Response) => {
        employee.value = Response.data
      })
  loading.value = false
})

const onUpdateData = async (data: Employee) => {
  await updateEmployee(url.currentRoute.value.params.id, data)
      .then((Response) => {
        Swal.fire({
          title: 'Actualizado',
          text: 'Se ha actualizado el funcionario',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          url.push({name: 'funcionarios-detail', params: {id: url.currentRoute.value.params.id}})
        })
      })
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <DetailView :data="employee"/>
      </div>
      <div class="col">
        <FormView :data="employee" @onUpdateData="onUpdateData"/>
      </div>
    </div>
  </div>

</template>


<script setup lang="ts">
import type { Employee } from '@/views/Personas/Funcionarios/services/funcionarios.interfaces';
import { findEmployeeByIdOrName } from '@/views/Personas/Funcionarios/services/funcionarios.services';
import { ref, watchEffect } from 'vue'
import PDFView from './PDFView.vue';
const search = ref<string>('')
const employee = ref([] as Employee[])
const store = ref({} as Employee)
const filterEmployee = async () => {
  employee.value = (await findEmployeeByIdOrName(search.value)).data
}

const storeEmployee = (item:Employee) =>{
  store.value = item
}

watchEffect(() => {
  if (search.value.length > 3) {
    filterEmployee()
  }
})

</script>

<template>
  <div class="input-group mb-3">
    <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
    <input type="text" class="form-control" placeholder="Ingrese identificación de funcionario" aria-label="Username"
      aria-describedby="inputSearch" v-model="search" />
  </div>
  <ul class="list-group" v-if="employee.length" v-for="item in employee">
    <li class="list-group-item" @click="storeEmployee(item)">{{ item.iden }} - {{ item.first_name }} {{ item.last_name }}</li>
  </ul>
  <div class="container">
    <PDFView :employee="store" v-if="store.iden" />
  </div>
</template>

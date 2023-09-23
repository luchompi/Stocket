<template>
    <div class="input-group mb-3">
        <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
        <input type="text" class="form-control" placeholder="ingrese identificacion o nombre de funcionario a buscar" aria-label="Username" aria-describedby="inputSearch"
            v-model="search" />
    </div>
    <ul class="list-group" v-if="employees.length" v-for="item in employees">
        <li class="list-group-item" @click="selectEmployee(item)">{{ item.iden }} - {{ item.first_name }} {{ item.last_name }}</li>
    </ul>
    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="employee.iden">
      <strong>{{ employee.iden }} - {{ employee.first_name }} {{ employee.last_name }}</strong> seleccionado.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearEmployee"></button>
    </div>
    <br>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { findEmployeeByIdOrName } from '@/views/Personas/Funcionarios/services/funcionarios.services';
import type { Employee } from '@/views/Personas/Funcionarios/services/funcionarios.interfaces';
const employees = ref([] as Employee[])
const search = ref<string>('')
const employee = ref({} as Employee)
const emits = defineEmits(['selectEmployee'])

const selectEmployee = (data: Employee) => {
    emits('selectEmployee', {data,status:false})
    search.value = ''
    employees.value = [] as Employee[]
    employee.value = data
}

const clearEmployee = () => {
    employee.value = {} as Employee
    emits('selectEmployee', {data:{},status:true})
}

watchEffect(async () => {
    if (search.value.length > 2) {
        await findEmployeeByIdOrName(search.value)
            .then((Response) => {
                employees.value = Response.data
            })
    }
})
</script>
<template>
   <div class="d-flex align-items-center">
     <div class="text-center flex-grow-1 mb-0">
       <h4>Operación de traspaso</h4> <i class="bi bi-sync"></i>
     </div>
     <div class="btn-group ml-auto" role="group" aria-label="Basic example">
       <button type="button" @click="createTraspaso" class="btn btn-success ml-auto" :disabled="reciever">Procesar <i class="bi bi-square-check"></i></button>
       <RouterLink :to="{name:'asig-list'}" type="button" class="btn btn-danger ml-auto" :disabled="reciever">Atrás <i class="bi bi-arrow-left"></i></RouterLink>
     </div>
   </div>
  <br>
  <funcionarioContainer @selectEmployee="selectEmployee" />
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Asignación previa seleccionada</h5>
      <div class="card-text">
        <elementosContainer />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import funcionarioContainer from '../containers/funcionarioContainer.vue';
import elementosContainer from '../containers/elementosContainer.vue';
import {RouterLink, useRouter} from "vue-router";
import type {Employee} from "@/views/Personas/Funcionarios/services/funcionarios.interfaces";
import Swal from "sweetalert2";
import {doTraspaso} from "@/views/Gestion/Traspasos/services/traspasos.services";

const reciever = ref<boolean>(false)
const json = ref<any>({})
const employee = ref({} as Employee)
const url = useRouter()


const selectEmployee = (data: any) => {
  employee.value = data.data
  reciever.value = data.status
  json.value = {
    funcionario:employee.value.iden
  }
}

const proceed = async() =>{
  const response = await doTraspaso(url.currentRoute.value.params.id,json)
  if(response.status == 200){
    Swal.fire({
      icon:'success',
      title:'Traspaso realizado',
      text:'El traspaso se ha realizado correctamente',
      showConfirmButton:false,
      timer:1500
    })
    url.push({name:'asig-list'})
  }
}

const createTraspaso = () => {
  Swal.fire({
    icon:'question',
    title:'¿Está seguro de realizar el traspaso?',
    text:'Esta acción no se puede deshacer',
    showCancelButton:true,
    confirmButtonText:'Si, estoy seguro',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      proceed()
    }
  })
}
</script>
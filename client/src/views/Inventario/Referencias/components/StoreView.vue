<template>
  <div class="card">
    <div v-if="!store.marca.length">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>¡404!</strong> No hay elementos seleccionados.
      </div>
    </div>
    <div v-else>
      <div class="card-body">
        <h5 class="card-title">Marcas seleccionadas</h5>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" @click="store.emptyMarcas()" class="btn btn-danger">Vaciar selección</button>
          <button type="button" @click="confirm()" class="btn btn-success">Procesar</button>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="element in store.marca" :key="element.id">
              <th scope="row">{{ element.id }}</th>
              <td>{{ element.name }}</td>
              <td>
                <button type="button" @click="store.deleteMarca(element.id)" class="btn btn-danger">Remover <i
                    class="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Swal from 'sweetalert2';
import { referenciasStore } from '../services/services/referencias.store';
import { useRouter } from 'vue-router';
const store = referenciasStore();
const url = useRouter();

const confirm = () =>{
  Swal.fire({
    icon:'question',
    title:'¿Está seguro?',
    text:'Para procesar, haga clic en aceptar',
    showCancelButton:true,
    showConfirmButton:true,
    confirmButtonText:'Aceptar',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      doProcess()
    }
  })
}

const doProcess = async () =>{
  await store.procesar(url.currentRoute.value.params.id)
  .then((Response)=>{
    Swal.fire({
      icon:'success',
      title:'¡Éxito!',
      text:'Se ha procesado la información correctamente',
      showConfirmButton:true,
      confirmButtonText:'Aceptar'
    }).then((result)=>{
      if(result.isConfirmed){
        url.push({name:'refer-detail',params:{id:url.currentRoute.value.params.id}})
      }
    })
  })
}
</script>
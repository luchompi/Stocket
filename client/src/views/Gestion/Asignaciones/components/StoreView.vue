<script setup lang="ts">
import { ref } from 'vue'
import { asignacionStore } from '../services/asignacion.store';
import Swal from 'sweetalert2';
const store = asignacionStore()
const confirmProcess = () =>{
  Swal.fire({
    icon:'question',
    title:'¿Está seguro de procesar la asignación?',
    text:'Se realizarán las asignaciones de los elementos seleccionados',
    showConfirmButton:true,
    showCancelButton:true
  }).then((result)=>{
    if(result.isConfirmed){
      store.process()
    }
  })
}
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Elementos seleccionados</h5>
      <div class="card-text" v-if="store.elements.length">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Elementos seleccionados</strong> {{ store.elements.length }}
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary" @click="confirmProcess">Procesar</button>
            <button type="button" class="btn btn-danger" @click="store.resetElements">Vaciar</button>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <th>Placa</th>
            <th>Referencia</th>
            <th>Modelo</th>
            <th>Acción</th>
          </thead>
          <tbody>
            <tr v-for="item in store.elements" :key="item.placa">
              <td>{{ item.placa }}</td>
              <td>{{ item.referencia }}</td>
              <td>{{ item.modelo }}</td>
              <td>
                <button @click="store.removeElement(item)" class="btn btn-danger">Quitar <i class="bi bi-x"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          Seleccione un elemento para empezar
        </div>
      </div>
    </div>
  </div>
</template>
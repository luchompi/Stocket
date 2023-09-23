<script setup lang="ts">
import {bajaStore} from "../../services/bajas.store";
import Swal from "sweetalert2";

const store = bajaStore()

const mensaje = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro?',
    text: '¿Desea procesar la baja de los elementos seleccionados?',
    showCancelButton: true,
    confirmButtonText: 'Procesar',
    cancelButtonText: 'Cancelar'
  })
      .then((result) => {
        if (result.isConfirmed) {
          store.procesar()
        }
      })
}
</script>

<template>
  <div class="alert alert-primary" role="alert" v-if="store.noElementos">
    No hay elementos, añada uno para empezar
  </div>
  <div v-else>
    <h5>
      Elementos seleccionados
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" @click="mensaje()">Procesar</button>
        <button class="btn btn-danger" @click="store.limpiarElementos()">Limpiar</button>
      </div>
    </h5>

    <table class="table table-striped table-hover">
      <thead>
      <th>Placa</th>
      <th>Referencia</th>
      <th>Modelo</th>
      <th>Remover</th>
      </thead>
      <tbody>
      <tr v-for="element in store.elements">
        <td>
          {{ element.placa }}
        </td>
        <td>
          {{ element.referencia }}
        </td>
        <td>
          {{ element.modelo }}
        </td>
        <td>
          <button class="btn btn-danger" @click="store.eliminarElemento(element)"><i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


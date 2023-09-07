<script setup lang="ts">
import type {Dependencia} from "@/views/Empresa/dependencias/services/dependencias.interfaces";
import {operationStore} from '../services/operations.store'

const operation = operationStore()

const props = defineProps<{
  sedeId: any,
  dependencias: Array<Dependencia>
}>()

</script>

<template>
  <div class="row">
    <div class="col">
      <table class="table table-striped table-hover" v-if="props.dependencias.length">
        <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Opcion</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="element in props.dependencias" :key="element.id">
          <td scope="row">{{ element.id }}</td>
          <td>{{ element.name }}</td>
          <td>
            <button type="button" class="btn btn-primary" @click="operation.setDataToJson({sede:props.sedeId,dependencia:element.id,dependencia_nombre:element.name})">Añadir</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>404!</strong> Esta sede posee todas las dependencias en sistema añadidas.
        </div>
      </div>
    </div>
    <div class="col">
      <h5>Dependencias Seleccionadas 
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-success" @click="operation.saveData(props.sedeId)" :disabled="!operation.json.length">Procesar</button>
          <button @click="operation.clearJsonData()" class="btn btn-danger" :disabled="!operation.json.length">Vacia selección</button>
          <RouterLink :to="{name:'operations-index'}" class="btn btn-secondary">Atrás</RouterLink>
        </div>
      </h5>
      <div class="alert alert-warning" role="alert" v-if="!operation.json.length">
        Selecciona una dependencia para añadirla a la sede
      </div>
      <table class="table table-striped table-hover" v-else>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Opción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="element in operation.json" :key="element.id">
            <th scope="row">{{ element.dependencia_id }}</th>
            <td>{{ element.dependencia_nombre }}</td>
            <td><button type="button" @click="operation.removeDataFromJson({dependencia_id:element.dependencia_id})" class="btn btn-danger">Remover</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


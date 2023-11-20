<template>
  <div class=" d-flex align-items-center">
    <div class="flex-grow-1 mb-0">
      <h3>Listado de dependencias</h3>
    </div>
    <div class="btn-group" role="group" aria-label="Basic example">
      <RouterLink :to="{ name: 'DepartamentosCreate' }" type="button" class="btn btn-success ml-auto">
        Crear
        <i class="bi bi-plus"></i>
      </RouterLink>
    </div>
  </div>
  <br />
  <div class="row">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
      <input type="text" v-model="search" class="form-control" placeholder="Ingrese nombre de dependencia a buscar"
        aria-label="Username" aria-describedby="basic-addon1">
    </div>
    <Animations :animation-data="store.dependencias.length ? Oficina : Warning"
      :style="store.dependencias.length ? { width: '400px', height: '400px' } : { width: '200px', height: '200px' }" />
    <div class="col" v-if="store.dependencias.length">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.dependencias.slice(0, 10)" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.description || 'No hay datos' }}</td>
            <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <RouterLink :to="{ name: 'DepartamentosUpdate', params: { id: item.id } }" type="button" class="btn btn-warning">
                  <i class="bi bi-pencil-square"></i></RouterLink>
                <button type="button" class="btn btn-danger" @click="store.eliminarDependencia(item.id)"><i
                    class="bi bi-trash"></i></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col" v-else>
      <div class="alert alert-warning d-flex align-items-center" role="alert" :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }">
        <div class="flex-grow-1 mb-0">
          <strong>¡No hay dependencias registradas!</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import Oficina from '@/assets/Icons/Oficina.json';
import Warning from '@/assets/Icons/Warning.json';
import useDependenciaStore from '@/stores/dependencias.store';
import { ref, watchEffect } from 'vue';

const search = ref<string>('');
const store = useDependenciaStore();
document.title = 'Dependencias - Stocket';
watchEffect(() => {
  store.buscarDependencia(search.value);
});
</script>
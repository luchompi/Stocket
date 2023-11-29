<script setup lang="ts">

import useSedeStore from "@/stores/sedes.store";
import Animations from "@/components/Animations.vue";
import Link from '@/assets/Icons/Link.json'
import Warning from '@/assets/Icons/Warning.json'

const store = useSedeStore()


</script>

<template>
  <div class="card-body">
    <h5>Seleccione una sede para explorar</h5>
    <div class="row">
      <Animations :animation-data="store.sedes.length ? Link : Warning" :style="{ width: '100px', height: '100px' }" />
      <div class="col">
        <table class="table table-striped table-inverse table-hover table-responsive" v-if="store.sedes.length">
          <thead class="thead-inverse">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Explorar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.sedes.slice(0, 5)">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>
                <RouterLink :to="{ name: 'sedeDependenciaDetails', params: { id: item.id } }"
                  class="btn btn-outline-info"><i class="bi bi-search"></i></RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="alert alert-warning alert-dismissible fade show" role="alert" v-else>
          <strong>404</strong>: No hay datos que mostrar.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
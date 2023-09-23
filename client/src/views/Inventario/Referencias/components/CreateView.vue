<template>
  <div class="container">
    <h6>Seleccione las marcas a añadir</h6>
    <div class="row">
      <!-- Marcas y buscador -->
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" placeholder="Ingrese nombre de la marca a buscar"
                 v-model="search"/>
        </div>
        <div v-if="marca.length">
          <div v-for="element in marca">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ element.name }}</h5>
                <button type="button" @click="store.addMarca(element)" class="btn btn-primary">Añadir</button>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
      <!--- Marcas seleccionadas -->
      <div class="col">
        <StoreView/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import StoreView from './StoreView.vue'
import type {Brands} from '../../Marcas/services/marca.interfaces';
import {getAllBrands, getBrand} from '../../Marcas/services/marca.services';
import {referenciasStore} from '../services/services/referencias.store';

const search = ref<string>('');
const marca = ref([] as Brands[]);
const loading = ref<boolean>(false);
const store = referenciasStore();

const fetchData = async () => {
  loading.value = true;
  await getAllBrands()
      .then((Response) => {
        marca.value = Response.data;
      })
      .finally(() => {
        loading.value = false;
      });
}

const searchData = async () => {
  loading.value = true;
  await getBrand(search.value)
      .then((Response) => {
        marca.value = Response.data;
      })
      .finally(() => {
        loading.value = false;
      });
}

watchEffect(() => {
  search.value ? searchData() : fetchData();
})
</script>
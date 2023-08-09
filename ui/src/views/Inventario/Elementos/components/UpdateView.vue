<script setup lang="ts">
import {onMounted, ref} from 'vue'
import type {Element} from '../services/elementos.interfaces';
import {getElementById, updateElement} from '../services/elementos.services';
import {useRouter} from 'vue-router';
import FormView from './FormView.vue'
import DataView from './DataView.vue'

const url = useRouter()
const loading = ref<boolean>(false)
const element = ref({} as Element)

onMounted(async () => {
  loading.value = true
  await getElementById(url.currentRoute.value.params.placa)
      .then((Response) => {
        element.value = Response.data
      })
      .finally(() => {
        loading.value = false
      })
})

const onUpdateData = (data: Element) => {
  updateElement(url.currentRoute.value.params.placa, data)
      .then((Response) => {
        url.push({name: 'elementos-list'})
      })

}
</script>
<template>
  <h5>Ingrese los datos a modificar</h5>
  <div class="row">
    <div class="col">
      <DataView :element="element"/>
    </div>
    <div class="col">
      <FormView :element="element" @onUpdateData="onUpdateData"/>
    </div>
  </div>
</template>
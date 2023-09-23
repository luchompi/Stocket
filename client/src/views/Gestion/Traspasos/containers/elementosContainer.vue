<template>
  <div class="row" v-if="loading">
    Espere ...
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div class="row" v-else>
    <p>Proceso realizado del {{ asignacion.timestamps }}</p>
    <h4>Funcionario: <strong>{{ funcionario[0]?.iden }}</strong> - {{ funcionario[0]?.first_name }} {{
      funcionario[0]?.last_name
    }}</h4>
    <h4>Elementos asignados</h4>
    <div v-for="detail in details" :key="detail.id">
      <div v-for="item in detail.elementos">
        <div class="card">
          <div class="card-body">
            <ElementView :element="item" />
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAsignacion, getElementsinAsignment } from "@/views/Gestion/Asignaciones/services/asignacion.services";
import { useRouter } from "vue-router";
import type { Asignation, AsignationDetail } from "@/views/Gestion/Asignaciones/services/asignacion.interfaces";
import ElementView from '@/views/Gestion/Asignaciones/components/ElementView.vue'

const asignacion = ref({} as Asignation)
const funcionario = ref([] as any)
const details = ref([] as AsignationDetail[])
const url = useRouter()
const loading = ref<boolean>(false)

const getElements = async () => {
  const response = await getElementsinAsignment(url.currentRoute.value.params.id)
  details.value = response.data
  loading.value = false
}

const getData = async () => {
  loading.value = true
  const response = await getAsignacion(url.currentRoute.value.params.id)
  asignacion.value = response.data
  funcionario.value = response.data.funcionario
  getElements()
}

onMounted(() => {
  getData()
})
</script>
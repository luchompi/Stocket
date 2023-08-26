<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAsignacion, getElementsinAsignment } from "../services/asignacion.services";
import { useRouter } from "vue-router";
import type { Asignation, AsignationDetail } from "../services/asignacion.interfaces";
import ElementView from './ElementView.vue'

const asignacion = ref({} as Asignation)
const funcionario = ref([] as any)
const details = ref([] as AsignationDetail[])
const url = useRouter()

const getElements = async () => {
  const response = await getElementsinAsignment(url.currentRoute.value.params.id)
  details.value = response.data
}

const getData = async () => {
  const response = await getAsignacion(url.currentRoute.value.params.id)
  asignacion.value = response.data
  funcionario.value = response.data.funcionario
  getElements()
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div class="card-body">
    <div class=" d-flex align-items-center">
      <div class="text-center flex-grow-1 ">
        <h2>Detalles de asignacion con PID {{ asignacion.id }}</h2>
      </div>
      <div class="btn-group ml-auto" role="group" aria-label="Basic example">
        <RouterLink :to="{ name: 'asig-report',params:{id:asignacion.id} }" class="btn btn-primary">Imprimir <i class="bi bi-printer"></i>
        </RouterLink>
      </div>
    </div>
    <div class="row">
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
  </div>
</template>

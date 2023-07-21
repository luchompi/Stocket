<template>
  <form @submit.prevent="sender">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputIden"><i class="bi bi-key-fill"></i></span>
      <input
          type="number"
          class="form-control"
          placeholder="Ingrese identificación de funcionario"
          aria-label="Username"
          aria-describedby="inputIden"
          minlength="6"
          :required="!props.data"
          v-model="iden"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputFirstName"><i class="bi bi-text-paragraph"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese Nombres de funcionario"
          aria-label="Username"
          aria-describedby="inputFirstName"
          :required="!props.data"
          v-model="firstName"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputLastName"><i class="bi bi-text-paragraph"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese Apellidos del funcionario"
          aria-label="Username"
          aria-describedby="inputLastName"
          :required="!props.data"
          v-model="lastName"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputAddress"><i class="bi bi-geo-alt"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese dirección del funcionario"
          aria-label="Username"
          aria-describedby="inputAddress"
          :required="!props.data"
          v-model="address"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputPhone"><i class="bi bi-phone"></i></span>
      <input
          type="number"
          class="form-control"
          placeholder="Ingrese número de teléfono. Solo se admiten números"
          aria-label="Username"
          aria-describedby="inputPhone"
          :required="!props.data"
          v-model="phone"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputMail"><i class="bi bi-envelope-at"></i></span>
      <input
          type="email"
          class="form-control"
          placeholder="Ingrese correo electrónico"
          aria-label="Username"
          aria-describedby="inputMail"
          v-model="mail"
          :required="!props.data"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputJob"><i class="bi bi-building-gear"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese cargo de funcionario"
          aria-label="Username"
          aria-describedby="inputJob"
          :required="!props.data"
          v-model="job"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputSearch"><i class="bi bi-search"></i></span>
      <input
          type="text"
          class="form-control"
          placeholder="Ingrese nombre de sede a buscar"
          aria-label="Username"
          aria-describedby="inputSearch"
          v-model="sede"
      />
    </div>
    <div class="list-group" v-if="!!sedes.length">
      <div v-for="elements in sedes" :key="elements.id">
        <a @click="chooseThisSede(elements)"
           :class="isActive? 'list-group-item list-group-item-action active':'list-group-item list-group-item-action'">{{
            elements.id
          }}
          - {{ elements.name }}</a>
      </div>
    </div>
    <div v-if="selectedSede.length">
      <div class="alert alert-info" role="alert">
        <strong>{{ selectedSede.id }} - {{ selectedSede.name }}</strong> seleccionada
      </div>
    </div>
    <button type="submit" class="btn btn-success">Guardar <i class="bi bi-arrow-down-right-square"></i></button>
  </form>

</template>

<script setup lang="ts">
import type {Employee} from "@/views/Personas/Funcionarios/services/funcionarios.interfaces";
import {computed, ref, watchEffect} from "vue";
import type {sedes} from "@/views/Empresa/sede/services/sedes.interfaces";
import {getSedeById} from "@/views/Empresa/services/empresa.services";

const iden = ref<number>(0)
const firstName = ref<string>("")
const lastName = ref<string>("")
const address = ref<string>("")
const phone = ref<number>(0)
const job = ref<string>("")
const sede = ref<string>("")
const mail = ref<string>("")
const sedes = ref([] as sedes[])
const selectedSede = ref<any>([])
const isActive = ref<boolean>(false)
computed(() => {
  isActive.value = !!onmouseover
})

watchEffect(async () => {
  if (sede.value) {
    const response = await getSedeById(sede.value)
    sedes.value = response.data
  } else {
    sedes.value = []
  }
})

const chooseThisSede = (element: any) => {
  selectedSede.value = element
  console.log('selected')
  console.log(selectedSede.value)
}

const emits = defineEmits(['onSaveData', 'onUpdateData'])
const props = defineProps<{
  data?: Array<Employee>,
}>()

const sender = () => {
  const data = {
    iden: iden.value,
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    phone: phone.value,
    job: job.value,
    sede_id: sede.value,
    mail: mail.value,
  }
  props.data ? emits('onUpdateData', data) : emits('onSaveData', data)
}

</script>
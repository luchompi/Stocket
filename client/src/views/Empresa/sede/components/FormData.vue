<template>
  <div class="col col-lg-7">
    <form @submit.prevent="displayAlert">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputName"><i class="bi bi-body-text"></i></span>
        <input
            type="text"
            class="form-control"
            placeholder="Ingrese nombre de la sede"
            aria-describedby="inputName"
            v-model="name"
            :required="!props.data"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputAddress"><i class="bi bi-geo"></i></span>
        <input
            type="text"
            class="form-control"
            placeholder="Ingrese dirección de la sede"
            aria-label="Username"
            aria-describedby="inputAddress"
            v-model="address"
            :required="!props.data"

        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputPhone"><i class="bi bi-telephone"></i></span>
        <input
            type="text"
            class="form-control"
            placeholder="Ingrese teléfono de la sede"
            aria-label="Username"
            aria-describedby="inputPhone"
            v-model="phone"
            :required="!props.data"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputEmail"><i class="bi bi-envelope"></i></span>
        <input
            type="text"
            class="form-control"
            placeholder="Ingrese correo de la sede"
            aria-label="Username"
            aria-describedby="inputEmail"
            v-model="email"
            :required="!props.data"
        />
      </div>
      <div class="form-floating">
      <textarea class="form-control" placeholder="Escriba una breve descripción de la empresa" id="floatingTextarea2"
                style="height: 100px" v-model="description"></textarea>
        <label for="floatingTextarea2">Descripción <i class="bi bi-blockquote-left"></i></label>
      </div>
      <br>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputWeb"><i class="bi bi-link"></i></span>
        <input
            type="text"
            class="form-control"
            placeholder="Ingrese sitio web de la sede"
            aria-describedby="inputWeb"
            v-model="web"
        />
      </div>
      <br>
      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import type { sedes } from '../services/sedes.interfaces';

const props = defineProps<{
  data?:Array<sedes>
}>()

const emits = defineEmits(['onSave', 'onUpdate'])

const name = ref<string>('')
const address = ref<string>('')
const phone = ref<string>('')
const email = ref<string>('')
const web = ref<string>('')
const description = ref<string>('')
const url = useRouter()
const storeData = () => {
  const data = {
    ...(props.data ? (name.value ? ({name:name.value}):({name:props.data[0]?.name})):({name:name.value}) ),
    ...(props.data ? (address.value ? ({address:address.value}):({address:props.data[0]?.address})):({address:address.value}) ),
    ...(props.data ? (phone.value ? ({phone:phone.value}):({phone:props.data[0]?.phone})):({phone:phone.value}) ),
    ...(props.data ? (email.value ? ({email:email.value}):({email:props.data[0]?.email})):({email:email.value}) ),
    ...(props.data ? (web.value ? ({web:web.value}):({web:props.data[0]?.web})):({web:web.value}) ),
    ...(props.data ? (description.value ? ({description:description.value}):({description:props.data[0]?.description})):({description:description.value}) ),
    empresa: url.currentRoute.value.params.nit
  }
  props.data ? (emits('onUpdate',data)) : (emits('onSave',data))
}

const displayAlert = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro de guardar estos datos?',
    text:'Una vez guardados no se podrán modificar',
    showDenyButton: true,
    confirmButtonText: `Guardar`,
    denyButtonText: `No guardar`,
  }).then((result) => {
    if (result.isConfirmed) {
      storeData()
    }
  })
}
</script>
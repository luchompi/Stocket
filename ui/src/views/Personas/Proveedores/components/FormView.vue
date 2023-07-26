<template>
  <div class="container">
    <form @submit.prevent="saveData">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputNIT"><i class="bi bi-key"></i></span>
        <input type="text" class="form-control" placeholder="Ingrese NIT del proveedor" aria-label="Username"
               aria-describedby="inputNIT" v-model="NIT" :required="!props.data" :disabled="!!props.data"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputRazonSocial"><i class="bi bi-body-text"></i></span>
        <input type="text" class="form-control" placeholder="Ingrese razón social del proveedor"
               aria-label="Username" aria-describedby="inputRazonSocial" v-model="razonSocial"
               :required="!props.data"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputDireccion"><i class="bi bi-geo"></i></span>
        <input type="text" class="form-control" placeholder="Especifique dirección del proveedor"
               aria-label="Username" aria-describedby="inputDireccion" v-model="direccion" :required="!props.data"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputCity"><i class="bi bi-map"></i></span>
        <input type="text" class="form-control" placeholder="Indique ciudad donde se encuentra el proveedor"
               aria-label="Username" aria-describedby="inputCity" v-model="ciudad" :required="!props.data"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputEmail"><i class="bi bi-envelope-at"></i></span>
        <input type="text" class="form-control" placeholder="Ingrese correo electrónico del proveedor"
               aria-label="Username" aria-describedby="inputEmail" v-model="correo" :required="!props.data"/>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputPhone"><i class="bi bi-phone"></i></span>
        <input type="text" class="form-control" placeholder="Especifique teléfono de contacto" aria-label="Username"
               aria-describedby="inputPhone" v-model="telefono" :required="!props.data"/>
      </div>
      <button type="submit" class="btn btn-success">Guardar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import type {Suppliers} from '../services/proveedor.interfaces';
import {ref} from 'vue'

const NIT = ref<string>('')
const razonSocial = ref<string>('')
const direccion = ref<string>('')
const ciudad = ref<string>('')
const correo = ref<string>('')
const telefono = ref<string>('')

const props = defineProps<{
  data?: Suppliers | null
}>();

const emits = defineEmits(['onSaveData', 'onUpdateData'])

const proceed = async () =>{
  const data ={
    ...(props.data ? (NIT.value ? ({NIT:NIT.value}):({NIT:props.data.NIT})):({NIT:NIT.value})),
    ...(props.data ? (razonSocial.value ? ({razonSocial:razonSocial.value}):({razonSocial:props.data.razonSocial})):({razonSocial:razonSocial.value})),
    ...(props.data ? (direccion.value ? ({address:direccion.value}):({direccion:props.data.address})):({address:direccion.value})),
    ...(props.data ? (ciudad.value ? ({city:ciudad.value}):({ciudad:props.data.city})):({city:ciudad.value})),
    ...(props.data ? (correo.value ? ({email:correo.value}):({email:props.data.email})):({email:correo.value})),
    ...(props.data ? (telefono.value ? ({phone:telefono.value}):({phone:props.data.phone})):({phone:telefono.value}))
  }
  props.data ? emits('onUpdateData', data) : emits('onSaveData', data)
}

const saveData = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro?',
    text: 'Verifique los datos primero, este proceso no se puede deshacer',
    showCancelButton:true,
    showConfirmButton:true,
    confirmButtonText:'Sí, proceder',
    cancelButtonText:'No, cancelar',
    confirmButtonColor:'#28a745',
    cancelButtonColor:'#dc3545'
  }).then((result) => {
    if(result.isConfirmed){
      proceed()
    }
  })
}



</script>
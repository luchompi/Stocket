<template>
  <form @submit.prevent="confirmStore" v-if="!loading">
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputNIT"><i class="bi bi-key-fill"></i></span>
      <input type="text" class="form-control" placeholder="Indique el NIT de la empresa" aria-describedby="inputNIT"
        v-model="NIT" :required="!props.empresa" minlength="5" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputName"><i class="bi bi-building"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese razón social de la entidad"
        aria-describedby="inputName" v-model="name" :required="!props.empresa" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputEmail"><i class="bi bi-envelope-at"></i></span>
      <input type="email" class="form-control" placeholder="Ingrese correo electronico de la empresa"
        aria-describedby="inputEmail" v-model="email" :required="!props.empresa" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputPhone"><i class="bi bi-phone"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese Teléfono de contacto" aria-describedby="inputPhone"
        v-model="phone" :required="!props.empresa" />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputAddress"><i class="bi bi-phone"></i></span>
      <input type="text" class="form-control" placeholder="Ingrese dirección de la empresa"
        aria-describedby="inputAddress" v-model="address" :required="!props.empresa" />
    </div>
    <div class="form-floating">
      <textarea class="form-control" placeholder="Escriba una breve descripción de la empresa" id="floatingTextarea2"
        style="height: 100px" v-model="description"></textarea>
      <label for="floatingTextarea2">Descripción <i class="bi bi-blockquote-left"></i></label>
    </div>
    <br>
    <button type="submit" class="btn btn-primary">Guardar <i class="bi bi-save"></i></button>
  </form>
  <div v-else>
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { ref } from 'vue';
import type { empresaInterface } from "@/views/Empresa/services/empresa.interfaces";
const props = defineProps<{
  empresa?: Array<empresaInterface>
}>()

const emits = defineEmits(['onSave', 'onUpdate']);

const NIT = ref<string>('');
const name = ref<string>('');
const email = ref<string>('');
const phone = ref<string>('');
const address = ref<string>('');
const description = ref<string>('');
const loading = ref<boolean>(false);

const confirmStore = () => {
  Swal.fire({
    icon: 'question',
    title: '¿Está seguro de guardar los datos?',
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      makeStore();
    }
  });
};

const makeStore = () => {
  loading.value = true;
  const data = {
    ...(props.empresa?.length ? { id: props.empresa[0]?.id } : {}),
    ...(props.empresa?.length ? (NIT.value ? { NIT: NIT.value } : { NIT: props.empresa[0]?.NIT }) : { NIT: NIT.value }),
    ...(props.empresa?.length ? (name.value ? { name: name.value } : { name: props.empresa[0]?.name }) : { name: name.value }),
    ...(props.empresa?.length ? (email.value ? { email: email.value } : { email: props.empresa[0]?.email }) : { email: email.value }),
    ...(props.empresa?.length ? (phone.value ? { phone: phone.value } : { phone: props.empresa[0]?.phone }) : { phone: phone.value }),
    ...(props.empresa?.length ? (address.value ? { address: address.value } : { address: props.empresa[0]?.address }) : { address: address.value }),
    ...(props.empresa?.length ? (description.value ? { description: description.value } : { description: props.empresa[0]?.description }) : { description: description.value })
  };
  if (props.empresa?.length) {
    emits('onUpdate', data)
  }
  else {
    emits('onSave', data)
  }
  loading.value = false;
};
</script>
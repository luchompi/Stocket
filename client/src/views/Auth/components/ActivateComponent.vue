<template>
  <h1 class="card-title">Activar cuenta</h1>
  <div v-if="loading">
    Espere ...
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <p class="card-text" v-else>Está a punto de validar su cuenta, para proceder haga clic
    <button @click="validate" class="btn btn-success">Aquí</button>
  </p>
</template>
<script setup lang="ts">
import {activateAccount} from '../services/auth.apis'
import {useRouter} from 'vue-router';
import {errorValidator} from '@/hooks/errors.hooks';
import Swal from 'sweetalert2';
import {ref, watchEffect} from 'vue';
import {redirectToHome} from '@/hooks/sesion.hook'
import {sesionStore} from "@/stores/sesion.store";

watchEffect(() => {
  redirectToHome()
})

const sesion = sesionStore()
const loading = ref<boolean>(false)
const url = useRouter()
const uid = url.currentRoute.value.params.uid
const token = url.currentRoute.value.params.token

const validate = async () => {
  loading.value = true
  const data = {
    uid: uid,
    token: token
  }
  await activateAccount(data)
      .then((Response) => {
        Swal.fire({
          icon: 'success',
          title: 'Activación',
          text: 'Se ha activado la cuenta'
        })
        sesion.isLogged ? url.push({name: 'profile'}) : url.push({name: 'login'})
      })
      .catch((error) => {
        const reciever = errorValidator(error.response.data)
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: reciever
        })
      })
      .finally(() => {
        loading.value = false
      })


}
</script>
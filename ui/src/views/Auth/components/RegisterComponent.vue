<template>
  <h5 class="card-title">Registro de usuario</h5>
  <p class="card-text"> Ingrese los datos solicitados </p>
  <div v-if="loading">
    <p>Espere mientras se ejecutan algunas tareas</p>
    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0"
        aria-valuemax="100" v-if="loading">
        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
  <form @submit.prevent="register" v-else>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputUsername"><i class="bi bi-person-circle"></i></span>
      <input
        type="text"
        class="form-control"
        placeholder="Indique un nombre de usuario"
        aria-describedby="inputUsername"
        v-model="username"
        required
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputPassword"><i class="bi bi-key"></i></span>
      <input
        type="password"
        class="form-control"
        placeholder="Defina una contraseña"
        aria-describedby="inputPassword"
        v-model="password"
        required
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputRePassword"><i class="bi bi-key-fill"></i></span>
      <input
        type="password"
        class="form-control"
        placeholder="Vuelva a ingresar la contraseña"
        aria-describedby="inputRePassword"
        required
        v-model="re_password"
      />
    </div>
    <div v-if="password != re_password">
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>¡Error!</strong> Las contraseña no coinciden. Por favor, vuelva a intentarlo.
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputEmail"><i class="bi bi-envelope"></i></span>
      <input
        type="email"
        class="form-control"
        placeholder="Especifique un correo"
        aria-label="Username"
        aria-describedby="inputEmail"
        required
        v-model="email"
      />
    </div>
    <button type="submit" class="btn btn-success">Crear usuario</button>
  </form>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { storeUser } from '../services/auth.apis';
import Swal from 'sweetalert2';
import { errorValidator } from '@/hooks/errors.hooks';
import { watchEffect } from 'vue';
import { redirectToHome } from '@/hooks/sesion.hook'
watchEffect(()=>{
    redirectToHome()
})
const username = ref<string>('')
const password = ref<string>('')
const re_password = ref<string>('')
const email = ref<string>('')
const loading = ref<boolean>(false)
const progress = ref<number>(0)

const register = async() =>{
  loading.value = true
  progress.value = 25
  const data = {
    username: username.value,
    password: password.value,
    re_password: re_password.value,
    email: email.value
  }
  progress.value = 50
  await storeUser(data)
  .then((Response)=>{
    Swal.fire({
      icon: 'success',
      title: 'Usuario creado con éxito',
      text:'Siga las instrucciones enviadas a su correo para activar su cuenta',
      showConfirmButton: true
    })
  })
  .catch((error)=>{
    progress.value = 75
    const reciever = errorValidator(error.response.data);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: reciever,
      showConfirmButton:false,
      timer: 2500
    })
  })
  .finally(()=>{
    loading.value = false 
    progress.value = 100
  })
}
</script>
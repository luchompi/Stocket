<template>
    <h5 class="card-title">
        Iniciar sesión
    </h5>
    <p class="card-text">
        Ingrese sus credenciales para iniciar
    </p>
  <div v-if="loading">
    <p><strong>Espere ...</strong></p>
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
    <form @submit.prevent="login" v-else>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputUsername"><i class="bi bi-person-badge"></i></span>
          <input
            type="text"
            class="form-control"
            placeholder="Usuario"
            aria-label="Username"
            aria-describedby="inputUsername"
            v-model="username"
            required
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputPassword"><i class="bi bi-key-fill"></i></span>
          <input
            type="password"
            class="form-control"
            placeholder="Contraseña"
            aria-label="Username"
            aria-describedby="inputPassword"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary" >Iniciar sesión</button>
        <div class="container">
          <RouterLink :to="{name:'reset-password'}" class="text-muted">¿Olvidó su contraseña?</RouterLink>
        </div>
    </form>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {getCredentials} from '@/views/Auth/services/auth.apis'
import Swal from 'sweetalert2'
import {errorValidator} from "@/hooks/errors.hooks";

const username = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)

const login = async() => {
  loading.value = true
    const data ={
        username: username.value,
        password: password.value
    }
    await getCredentials(data)
    .then((Response)=>{
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Sesión iniciada satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
        })
    })
    .catch((error)=>{
      const reciever = errorValidator(error.response.data);
      Swal.fire({
        icon:'error',
        title:'error',
        text:reciever,
        showConfirmButton: false,
        timer: 1500
      })
    })
        .finally(()=>loading.value = false)

}
</script>
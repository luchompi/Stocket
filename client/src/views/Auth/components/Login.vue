<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import Fingerprint from '@/assets/Icons/Fingerprint.json'
import useSesionStore from '@/stores/sesion.store';
import { ref } from 'vue'
import type { Login } from '../services/auth.interfaces';

document.title = 'Iniciar sesión - Stocket'


const sesion = useSesionStore()

const data = ref({} as Login)

const handleChange = (e: any) => {
  data.value = {
    ...data.value,
    [e.target.name]: e.target.value
  }
}

const handleSubmit = (e: any) => {
  e.preventDefault()
  sesion.iniciarSesion(data.value)
}
</script>
<template>
  <div class="card-header">
    <h6>Inicar sesión</h6>
  </div>
  <div class="card-body">
    <div class="row">
      <Animations :animation-data="Fingerprint" :style="{
        width: '100px',
        height: '100px'
      }" />
      <div class="col">
        <div class="card-title">
          <h5>Iniciar sesión</h5>
        </div>
        <p class="card-text">Ingrese sus credenciales para empezar</p>
        <form @submit="handleSubmit">
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-person-badge"></i></span>
            <div class="form-floating">
              <input type="text" name="username" @input="handleChange" class="form-control" id="Username"
                placeholder="Usuario">
              <label for="Username">Usuario</label>
            </div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
            <div class="form-floating">
              <input type="password" name="password" @input="handleChange" class="form-control" id="Password"
                placeholder="Contraseña">
              <label for="Password">Contraseña</label>
            </div>
          </div>
          <div class="btn-group">
            <button type="submit" class="btn btn-success">Entrar <i class="bi bi-arrow-right"></i></button>
            <RouterLink :to="{ name: 'ResetPassword' }" type="button" class="btn btn-secondary">¿Olvidó su contraseña?<i
                class="bi bi-question"></i>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
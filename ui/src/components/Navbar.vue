<template>
  <nav class="py-2 bg-body-tertiary border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 active" aria-current="page">Home</a></li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'empresa' }" class="nav-link ink-body-emphasis px-2 link-dark ">Empresa <i class="bi bi-building"></i></RouterLink>
        </li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Pricing</a></li>
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">FAQs</a></li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'about' }" class="nav-link link-body-emphasis px-2">About</RouterLink>
        </li>
      </ul>
      <ul class="nav" v-if="sesion.isLogged">
        <li class="nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false">
              Sesión iniciada como {{ sesion.UserData[0]?.username }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <RouterLink :to="{ name: 'profile' }" class="dropdown-item">Perfil <i class="bi bi-person-badge"></i>
                </RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'reset-password' }" class="dropdown-item">Cambiar contraseña <i
                    class="bi bi-sync"></i></RouterLink>
              </li>
              <li><a class="dropdown-item" @click="sesion.clearSesion()">Salir <i class="bi bi-power"></i></a></li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="nav" v-else>
        <li class="nav-item">
          <RouterLink :to="{ name: 'login' }" class="nav-link link-body-emphasis px-2">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :to="{ name: 'register' }" class="nav-link link-body-emphasis px-2">Sign up</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <header class="py-3 mb-4 border-bottom">
    <div class="container d-flex flex-wrap justify-content-center">
      <RouterLink :to="{ name: 'home' }"
        class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap" />
        </svg>
        <span class="fs-4">Stocket <i class="bi bi-archive-fill"></i> </span>
      </RouterLink>
      <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
        <input type="search" class="form-control" :value="props.dateTime" readonly>
      </form>
    </div>
  </header>
</template>

<script setup lang="ts">
import { sesionStore } from '@/stores/sesion.store';

const sesion = sesionStore()
const props = defineProps<{
  dateTime: string
}>()
</script>
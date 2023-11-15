<template>
    <nav class="py-2 bg-body-tertiary border-bottom">
        <div class="container d-flex flex-wrap nav-item">
            <ul class="nav me-auto">
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 active"
                        aria-current="page">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Features</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Pricing</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">FAQs</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">About</a></li>
            </ul>
            <ul class="nav" v-if="sesion.isAuth">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        sesión iniciada como {{ sesion.userData.username }}
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <RouterLink :to="{ name: 'Profile' }" class="dropdown-item">Perfil de usuario <i
                                    class="bi bi-person-badge"></i></RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'ResetPassword' }" class="dropdown-item">Cambiar contraseña <i
                                    class="bi bi-key"></i></RouterLink>
                        </li>
                        <li><a class="dropdown-item" @click="sesion.cerrarSesion">Salir <i class="bi bi-power"></i></a></li>
                    </ul>
                </div>

            </ul>
            <ul class="nav" v-else>
                <li class="nav-item">
                    <RouterLink :to="{ name: 'Login' }" class="nav-link link-body-emphasis px-2">Login</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{ name: 'Register' }" class="nav-link link-body-emphasis px-2">Sign up</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
    <header class="py-3 mb-4 border-bottom">
        <div class="container d-flex flex-wrap justify-content-center">
            <RouterLink :to="{name:'home'}" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
                <div :style="{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }">
                    <div v-if="sesion.isAuth">
                        <h3>Stocket - {{sesion.userData.groups?.includes('Administrador' || 'Encargado')  ? sesion.userData.groups[0] : (sesion.userData.is_superuser ? 'SuperUsuario' : 'Invitado') }}</h3>
                    </div>
                    <div v-else>
                        <h3>Stocket</h3>
                    </div>
                </div>
            </RouterLink>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="input1"><i class="bi bi-watch"></i></span>
                    <input type="text" class="form-control" readonly :value="props.dateTime" />
                </div>
            </form>
        </div>
    </header>
</template>

<script setup lang="ts">
import useSesionStore from '@/stores/sesion.store';
const sesion = useSesionStore()
const props = defineProps<{
    dateTime: string
}>()
</script>
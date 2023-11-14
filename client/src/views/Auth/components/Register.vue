<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import EditDocument from '@/assets/Icons/EditDocument.json'
import { ref, watchEffect } from 'vue'
import type { Register } from '../services/auth.interfaces';
import useSesionStore from '@/stores/sesion.store';
import { RedirectIfAuth } from '@/middleware/auth.middleware'
document.title = 'Registro de usuarios - Stocket'
RedirectIfAuth()
const loading = ref(false)
const sesion = useSesionStore()
const data = ref({} as Register)

watchEffect(() => {
    loading.value = sesion.loadingStatus
})

const handleChange = (e: any) => {
    data.value = {
        ...data.value,
        [e.target.name]: e.target.value
    }
}

const handleSubmit = async (e: any) => {
    e.preventDefault()
    sesion.registrarUsuario(data.value)
}

</script>

<template>
    <div class="card-header">
        <h6>Registro de usuarios</h6>
    </div>
    <div class="card-body">
        <div class="row">
            <Animations :animation-data="EditDocument" :style="{
                width: '100px',
                height: '100px'
            }" />
            <div class="col">
                <h5>Ingrese sus datos para empezar</h5>
                <form @submit="handleSubmit">
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
                        <div class="form-floating">
                            <input type="text" name="username" required @input="handleChange" class="form-control"
                                id="Username" placeholder="Username">
                            <label for="Username">Nombre de usuario</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                        <div class="form-floating">
                            <input type="password" name="password" @input="handleChange" required class="form-control"
                                id="Password" placeholder="Username">
                            <label for="Password">Ingrese su contraseña</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                        <div class="form-floating">
                            <input type="password" name="re_password" required @input="handleChange" class="form-control"
                                id="RePassword" placeholder="Username">
                            <label for="RePassword">Repita contraseña</label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                        <div class="form-floating">
                            <input type="email" name="email" required @input="handleChange" class="form-control" id="Email"
                                placeholder="Username">
                            <label for="Email">Ingrese correo electrónico</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Guardar <i class="bi bi-save"></i></button>
                </form>
            </div>
        </div>
    </div>
</template>
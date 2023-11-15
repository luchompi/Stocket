<template>
    <div class="card-header">
        <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-0">
                <h6>Perfil de usuario - Editar perfil</h6>
            </div>
            <RouterLink :to="{ name: 'Profile' }" class="btn btn-secondary ml-auto">Regresar <i
                    class="bi bi-arrow-left"></i>
            </RouterLink>
        </div>
    </div>
    <div class="card-body">
        <div class="row">
            <Animations :animation-data="EditDocument" :style="{ width: '100px', height: '100px' }" />
            <div class="col">
                <h6>Ingrese los datos a modificar</h6>
                <form @submit="handleSubmit">
                    <div class="row">
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="first_name" name="first_name"
                                    placeholder="Nombre" v-model="data.first_name" @change="handleChange">
                                <label for="first_name">Nombre</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="last_name" name="last_name"
                                    placeholder="Apellido" v-model="data.last_name" @change="handleChange">
                                <label for="last_name">Apellido</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="address" name="address" placeholder="Dirección"
                            v-model="data.address" @change="handleChange">
                        <label for="address">Dirección</label>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="city" name="city" placeholder="Ciudad"
                                    v-model="data.city" @change="handleChange">
                                <label for="city">Ciudad</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Teléfono"
                                    v-model="data.phone" @change="handleChange">
                                <label for="phone">Teléfono</label>
                            </div>
                        </div>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import useSesionStore from '@/stores/sesion.store';
import { ref } from 'vue';
import EditDocument from '@/assets/Icons/EditDocument.json';
const sesion = useSesionStore()
const data = ref({
    first_name: sesion.userData.first_name || '',
    last_name: sesion.userData.last_name || '',
    address: sesion.userData.address || '',
    city: sesion.userData.city || '',
    uid: sesion.userData.uid || '',
    phone: sesion.userData.phone || ''
})

const handleChange = (e: any) => {
    data.value = {
        ...data.value,
        [e.target.name]: e.target.value
    }
}

const handleSubmit = (e: any) => {
    e.preventDefault()
    sesion.actualizarUsuario(data.value)
}

document.title ='Actualizar perfil - Stocket'
</script>
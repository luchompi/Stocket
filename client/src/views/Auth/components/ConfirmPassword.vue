<template>
    <div class="card-header">
        <h6>Cambio de contraseña</h6>
    </div>
    <div class="card-body">
        <div class="card-title">
            <h5>
                Cambio de contraseña
            </h5>
        </div>
        <div class="row">
            <Animations :animation-data="EditDocument" :style="{ width: '100px', height: '100px' }" />
            <div class="col">
                <p class="card-text">Ingrese su nueva contraseña</p>
                <form @submit="handleSubmit">
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <div class="form-floating">
                            <input type="password" name="new_password" @input="handleChange" class="form-control"
                                id="Password" placeholder="Escriba su contraseña" required>
                            <label for="Password">Nueva contraseña </label>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                        <div class="form-floating">
                            <input type="password" name="re_new_password" @input="handleChange" class="form-control"
                                id="Password2" placeholder="Repita su contraseña" required>
                            <label for="Password2">Repita su contraseña</label>
                        </div>
                    </div>
                    <div v-if="data.new_password !== data.re_new_password">
                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>¡Error! </strong> Las contraseñas no coinciden
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success">Guardar <i class="bi bi-save"></i></button>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import EditDocument from '@/assets/Icons/EditDocument.json';
import { ref } from 'vue';
import useSesionStore from '@/stores/sesion.store';
import { useRouter } from 'vue-router';
const sesion = useSesionStore()
const url = useRouter()



const data = ref({
    new_password: '',
    re_new_password: '',
    uid: url.currentRoute.value.params.uid,
    token: url.currentRoute.value.params.token
})

const handleChange = (e: any) => {
    data.value = {
        ...data.value,
        [e.target.name]: e.target.value
    }

}

const handleSubmit = (e: any) => {
    e.preventDefault()
    sesion.cambiarContrasena(data.value)

}

document.title = "Cambiar contraseña - Stocket"
</script>
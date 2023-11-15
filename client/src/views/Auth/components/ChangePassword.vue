<template>
    <div class="card-header">
        <h6>¿Olvidó su contraseña?</h6>
    </div>
    <div class="card-body">
        <div class="row">
            <Animations :animation-data="SendMail" :style="{ width: '100px', height: '100px' }" />
            <div class="col">
                <h5>Reestablecer contraseña</h5>
                <div v-if="sesion.isAuth">
                    <p>A continuación, se le enviará a su correo electrónico instrucciones para reestablecer su contraseña,
                        solo debe hacer clic <button class="btn btn-outline-success" @click="handleSubmit">Aquí</button></p>
                </div>
                <div v-else>
                    <p>Para realizar este proceso, escriba el correo electrónico asociado a su cuenta, si es válido se le
                        enviará un
                        correo con información para el cambio de contraseña</p>
                    <form @submit="handleSubmit">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                            <div class="form-floating">
                                <input type="email" name="email" @input="handleChange" class="form-control" id="Username"
                                    placeholder="Ej. jdoe@mail.to" required>
                                <label for="Username">Correo electrónico</label>
                            </div>
                        </div>
                        <button type="button" class="btn btn-success" @click="handleSubmit">Enviar correo</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import SendMail from '@/assets/Icons/SendMail.json'
import Animations from '@/components/Animations.vue';
import { ref } from 'vue'
import useSesionStore from '@/stores/sesion.store';
const sesion = useSesionStore()

const data = ref({
    email: sesion.userData.email || ''
})
document.title = 'Cambiar contraseña - Stocket'

const handleChange = (e: any) => {
    data.value = {
        ...data.value,
        [e.target.name]: e.target.value
    }
}

const handleSubmit = (e: any) => {
    e.preventDefault()
    sesion.recuperarContrasena(data.value)
}

</script>
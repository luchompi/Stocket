<template>
    <h4 class="card-title">
        Reestablecer Contraseña
    </h4>
    <!---Animacion de carga-->
    <div v-if="loading">
            <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75"
                aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: progress + '%' }">
                </div>
            </div>
        </div>
        <!----Fin animacion de carga-->
    <div v-else>
        <div v-if="sesion.isLogged">
        <p class="card-text" >
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>¡Advertencia!</strong> Para cambiar su contraseña, haga clic en el botón de abajo. Se enviará un
            correo electrónico a su dirección de correo electrónico asociado al perfil con un enlace para cambiar su
            contraseña.
        </div>
        <button class="btn btn-warning" @click="sendEmail">Entendido, proceder</button>
        </p>
        </div>

        <div v-else>
            <p class="card-text">
            Para actualizar su contraseña, ingrese su correo electrónico y le enviaremos un enlace de reestablecimiento.
        </p>
        <form @submit.prevent="sendEmail">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputEmail"><i class="bi bi-envelope"></i></span>
                <input type="text" class="form-control" placeholder="Ingrese su correo electrónico" aria-label="Username"
                    aria-describedby="inputEmail" v-model="email" required />
            </div>
            <button type="submit" class="btn btn-success" :disabled="!email || loading">Enviar correo</button>
        </form>
        </div>
        
        
    </div>
    
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { resetPassword } from '../services/auth.apis';
import Swal from 'sweetalert2';
import { errorValidator } from '@/hooks/errors.hooks';
import { sesionStore } from '@/stores/sesion.store';
const loading = ref<boolean>(false)
const sesion = sesionStore()
const email = ref<string>('')
const progress = ref<number>(0)

const sendEmail = async () => {
    loading.value = true
    progress.value = 25
    const data = {
        ...(sesion.isLogged ? { email: sesion.UserData[0]?.email } : { email: email.value })
    }
    progress.value = 50
    await resetPassword(data)
        .then((Response) => {
            Swal.fire({
                icon: 'info',
                title: 'Correo Enviado',
                text: 'Se ha enviado un correo electronico a su direccion asociada, siga las instrucciones',
            })
        })
        .catch((error) => {
            progress.value = 75
            const reciever = errorValidator(error.response.data)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: reciever,
            })
        })
        .finally(() => {
            loading.value = false
            progress.value = 0
        })
}
</script>
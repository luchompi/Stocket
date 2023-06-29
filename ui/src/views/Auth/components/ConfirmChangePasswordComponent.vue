<template>
    <h5 class="card-title">Actualizar Contraseña</h5>
    <p class="card-text">Ingrese su nueva contraseña</p>
    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0"
        aria-valuemax="100" v-if="loading">
        <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{ width: progress + '%' }"></div>
    </div>
    <form @submit.prevent="changePassword" v-else>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputPassword1"><i class="bi bi-key"></i></span>
            <input type="password" class="form-control" placeholder="Ingrese su nueva contraseña" aria-label="Username"
                aria-describedby="inputPassword1" v-model="password" />
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputPassword2"><i class="bi bi-key-fill"></i></span>
            <input type="password" class="form-control" placeholder="Confirme su nueva contraseña" aria-label="Username"
                aria-describedby="inputPassword2" v-model="re_password" />
        </div>
        <div v-if="password != re_password"></div>
        <button type="submit" class="btn btn-success" :disabled="password != re_password && !password && !re_password">Cambiar
            contraseña</button>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { resetPasswordConfirm } from '../services/auth.apis';
import { errorValidator } from '@/hooks/errors.hooks';
const password = ref<string>('');
const re_password = ref<string>('');
const url = useRouter();
const loading = ref<boolean>(false);
const progress = ref<number>(0);

const updatePassword = async () => {

    const data = {
        uid: url.currentRoute.value.params.uid,
        token: url.currentRoute.value.params.token,
        new_password: password.value,
        re_new_password: re_password.value
    }
    progress.value = 50
    const response = await resetPasswordConfirm(data)
        .then((Response) => {

            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'Su contraseña ha sido actualizada correctamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    url.push({ name: 'login' })
                }
            })
        })
        .catch((error) => {

            const reciever = errorValidator(error.response.data)
            progress.value = 75
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: reciever,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            })
        })
        .finally(() => {
            progress.value = 100
            loading.value = false
        })

}

const changePassword = () => {
    loading.value = true
    Swal.fire({
        icon: 'question',
        title: '¿Está seguro?',
        text: '¿Desea cambiar su contraseña?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result) {
            updatePassword()
            progress.value = 25
        }
    })
}
</script>
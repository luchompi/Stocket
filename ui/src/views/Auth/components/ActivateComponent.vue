<template>
    <h1 class="card-title">Activar cuenta</h1>
    <p class="card-text">Está a punto de validar su cuenta, para proceder haga clic <button @click="validate" class="btn btn-success">Aquí</button></p>
</template>
<script setup lang="ts">
import {activateAccount } from '../services/auth.apis'
import { useRouter } from 'vue-router';
import { errorValidator } from '@/hooks/errors.hooks';
import Swal from 'sweetalert2';
import { watchEffect } from 'vue';
import { redirectToHome } from '@/hooks/sesion.hook'
watchEffect(()=>{
    redirectToHome()
})

const url = useRouter()
const uid = url.currentRoute.value.params.uid
const token = url.currentRoute.value.params.token

const validate = async() =>{
    const data = {
        uid: uid,
        token: token
    }
    await activateAccount(data)
    .then((Response)=>{
        Swal.fire({
            icon:'success',
            title:'Activación',
            text:'Se ha activado la cuenta'
        })
    })
    .catch((error)=>{
        const reciever = errorValidator(error.response.data)
        Swal.fire({
            icon:'error',
            title:'Error!',
            text:reciever
        })
    })
    .finally(()=>{
        url.push({name:'login'})
    })


}
</script>
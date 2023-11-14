<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import { useRouter } from 'vue-router';
import COMMS from '@/assets/Icons/COMMS.json';
import useSesionStore from '@/stores/sesion.store'
import { RedirectIfAuth } from '@/middleware/auth.middleware'
RedirectIfAuth()
const sesion = useSesionStore();
const url = useRouter()

const { uid, token } = url.currentRoute.value.params

const activacion = () => {
    var data = {
        uid: uid,
        token: token
    }
    sesion.activarPerfil(data)

}
</script>


<template>
    <div class="card-header">
        <h6>Activación de cuenta</h6>
    </div>
    <div class="card-body">
        <div class="row">
            <h5>Está a punto de activar su cuenta</h5>
            <p>Para hacerlo, haga clic <button type="button" class="btn btn-success" @click="activacion">Aquí</button>
            </p>
        </div>
    </div>
</template>
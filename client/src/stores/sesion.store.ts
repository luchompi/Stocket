import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Login, Register } from '@/views/Auth/services/auth.interfaces'
import { login, registro } from '@/views/Auth/services/auth.apis'
import { errorMessage, successMessage } from '@/components/messages'

const useSesionStore = defineStore('counter', () => {
    const timer = ref(0)
    const PAT = ref<string | null>(null)
    const RAT = ref<string | null>(null)
    const isAuth = computed(() => PAT.value !== null && RAT.value !== null
        && PAT.value.length > 200 && RAT.value.length > 200 && PAT.value !== RAT.value)
    const loadingStatus = ref(false)

    const iniciarSesion = async (data: Login) => {
        loadingStatus.value = true
        await login(data)
            .then((Response) => {
                PAT.value = Response.data.access
                RAT.value = Response.data.refresh
                successMessage('Bienvenido', 'Sesión iniciada correctamente')
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loadingStatus.value = false
            })
    }

    const registrarUsuario = async (data: Register) => {
        loadingStatus.value = true
        await registro(data)
            .then((Response) => {
                successMessage('Usuario registrado', 'Usuario registrado correctamente. Verifique su correo electrónico para activar su cuenta')
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loadingStatus.value = false
            })
    }

    const activarCuenta = () =>{
        
    }

    const cerrarSesion = () => {
        timer.value = 0
        PAT.value = null
        RAT.value = null
    }

    return {
        timer,
        PAT,
        RAT,
        isAuth,
        loadingStatus,
        iniciarSesion,
        cerrarSesion,
        registrarUsuario
    }
})

export default useSesionStore
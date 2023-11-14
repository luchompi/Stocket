import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Activate, Login, Register } from '@/views/Auth/services/auth.interfaces'
import { login, registro, activarCuenta } from '@/views/Auth/services/auth.apis'
import { errorMessage, successMessage } from '@/components/messages'
import { useRouter } from 'vue-router'
const useSesionStore = defineStore('counter', () => {
    const url = useRouter()
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
                url.push({ name: 'Login' })
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loadingStatus.value = false
            })
    }

    const activarPerfil = async (data: Activate) => {
        loadingStatus.value = true
        await activarCuenta(data)
            .then((Response) => {
                successMessage('¡Cuenta activada!', 'Puede iniciar sesión')
                url.push({ name: 'Login' })
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loadingStatus.value = false
            })

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
        registrarUsuario,
        activarPerfil
    }
})

export default useSesionStore
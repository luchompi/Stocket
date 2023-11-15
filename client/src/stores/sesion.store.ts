import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Activate, Login, Register, User } from '@/views/Auth/services/auth.interfaces'
import {
    login,
    registro,
    activarCuenta,
    cambiarContraseña,
    obtenerDatosUsuario,
    guardarNuevaContrasena,
    actualizarPAT
} from '@/views/Auth/services/auth.apis'
import { errorMessage, successMessage } from '@/components/messages'
import { useRouter } from 'vue-router'
import { actualizarDatosUsuario } from '@/views/Profile/services/profile.apis'
const useSesionStore = defineStore('sesion', () => {
    const url = useRouter()
    const timer = ref(0)
    const PAT = ref<string | null>(null)
    const RAT = ref<string | null>(null)
    const isAuth = computed(() => PAT.value !== null && RAT.value !== null
        && PAT.value.length > 200 && RAT.value.length > 200 && PAT.value !== RAT.value)
    const loadingStatus = ref(false)
    const userData = ref({} as User)

    const refrescarSesion = async() =>{
        await actualizarPAT()
            .then((Response)=>{
                PAT.value = Response.data.access
                timer.value = 0
            })
            .catch((error)=>{
                errorMessage(error.response.data)
                cerrarSesion()
            })
    }

    const incrementTimer = () => {
        timer.value++
    }
    const obtenerUsuario = async () => {
        await obtenerDatosUsuario()
            .then((Response) => {
                userData.value = Response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const iniciarSesion = async (data: Login) => {
        loadingStatus.value = true
        await login(data)
            .then((Response) => {
                PAT.value = Response.data.access
                RAT.value = Response.data.refresh
                successMessage('Bienvenido', 'Sesión iniciada correctamente')
            })
            .then(() => {
                obtenerUsuario()
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

    const recuperarContrasena = async (data: any) => {
        loadingStatus.value = true
        await cambiarContraseña(data)
            .then((Response) => {
                successMessage('¡Correo enviado!', 'Verifique su correo electrónico para cambiar su contraseña')
                url.push({ name: 'Login' })
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loadingStatus.value = false
            })

    }

    const cambiarContrasena = async (data: any) => {
        loadingStatus.value = true
        await guardarNuevaContrasena(data)
            .then((Response) => {
                successMessage('¡Contraseña cambiada!', 'Puede iniciar sesión')
                url.push({ name: 'Login' })
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loadingStatus.value = false
            })
    }

    const setLoadingStatus = () => {
        loadingStatus.value = !loadingStatus.value
    }

    const actualizarUsuario = async (data: any) => {
        loadingStatus.value = true
        await actualizarDatosUsuario(data)
            .then((Response) => {
                successMessage('¡Hecho!', 'Datos actualizados correctamente')
                obtenerUsuario()
                url.push({ name: 'Profile' })
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
        userData.value = {} as User
        successMessage('¡Hasta pronto!', 'Sesión cerrada correctamente')
    }

    return {
        timer,
        PAT,
        RAT,
        isAuth,
        loadingStatus,
        userData,
        iniciarSesion,
        cerrarSesion,
        registrarUsuario,
        activarPerfil,
        recuperarContrasena,
        cambiarContrasena,
        setLoadingStatus,
        actualizarUsuario,
        refrescarSesion,
        incrementTimer
    }
})

export default useSesionStore
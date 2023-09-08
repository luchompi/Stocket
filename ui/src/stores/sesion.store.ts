import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import Swal from 'sweetalert2'
import {refreshTokens} from '@/views/Auth/services/auth.apis'

export const sesionStore = defineStore('sesion', () => {
    const PAT = ref<string | null>(null)
    const RAT = ref<string | null>(null)
    const UserData = ref<any | null>([])
    const NIT = ref<string | null>(null)
    const timer = ref<number>(0)
    const refreshed = ref<boolean>(false)
    const isShowed = ref<boolean>(false)
    const isLogged = computed(() => PAT.value !== '' && RAT.value !== ''
        && PAT.value !== null && RAT.value !== null
        && PAT.value.length > 200 && RAT.value.length > 200
    )

    const setTokens = (data: any) => {
        if (isLogged.value) {
            PAT.value = data.access
            timer.value = 0
            refreshed.value = true
        } else {
            PAT.value = data.access
            RAT.value = data.refresh
        }
        isShowed.value = false
    }

    const setUserData = (data: any) => {
        isLogged.value ? (UserData.value ? UserData.value[0] = data : UserData.value = data) : UserData.value = null
    }

    const clearSesion = () => {
        if (isShowed.value) {
            Swal.fire({
                title: 'Sesión cerrada',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            PAT.value = null
            RAT.value = null
            UserData.value = null
            timer.value = 0
            NIT.value = null
            isShowed.value = true
            location.reload()
        }
    }

    const incrementTimer = () => {
        if (isLogged.value) {
            timer.value++
            console.log(timer.value)
        }
        timer.value > 15 ? refreshed.value = false : refreshed.value = true
    }

    const refreshAccessToken = () => {
        if (timer.value > 1500 && timer.value < 1700 && isLogged.value && refreshed.value == false) {
            refreshTokens()
        }
    }

    const setNIT = (nit: string) => {
        NIT.value = nit
    }

    return {
        PAT,
        RAT,
        NIT,
        UserData,
        isLogged,
        timer,
        isShowed,
        setTokens,
        setNIT,
        setUserData,
        clearSesion,
        incrementTimer,
        refreshAccessToken
    }
})

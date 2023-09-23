import {sesionStore} from "@/stores/sesion.store";
import {useRouter} from "vue-router";
import {watchEffect} from "vue";

export const loginRequired = () => {
    const sesion = sesionStore()
    const url = useRouter()
    watchEffect(() => {
        sesion.isLogged ? null : url.push({name: 'login'})
    })
}

export const loginAndAdminRequired = () => {
    const sesion = sesionStore()
    const url = useRouter()
    watchEffect(() => {
        sesion.isLogged ? (sesion.UserData[0]?.is_superuser || sesion.UserData[0]?.groups?.includes('Administradores') || sesion.UserData[0]?.groups?.includes('Administrador') ? null : url.push({name: 'Forbidden'})) : url.push({name: 'login'})
    })
}

export const redirectToHome = () => {
    const sesion = sesionStore()
    const url = useRouter()
    watchEffect(() => {
        sesion.isLogged ? url.push({name: 'home'}) : null
    })
}
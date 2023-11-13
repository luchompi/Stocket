import useSesionStore from "../stores/sesion.store";
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

interface RedirectIfAuth {
    (): void
}

interface RedirectIfNotAuth {
    (): void
}

export const RedirectIfAuth: RedirectIfAuth = () => {
    const url = useRouter()
    const useSesion = useSesionStore()
    watchEffect(() => {
        useSesion.isAuth ? url.push({ name: 'home' }) : null
    })
}

export const RedirectIfNotAuth: RedirectIfAuth = () => {
    const url = useRouter()
    const useSesion = useSesionStore()
    watchEffect(() => {
        useSesion.isAuth ? null : url.push({ name: 'login' })
    })
}


import baseApi from "../../../apis/base.api";
import useSesionStore from "../../../store/sesion.store";

export const obtenerTokens = (data) => {
    return baseApi.post('jwt/create', data)
}

export const guardarUsuario = (data) => {
    return baseApi.post('users/', data)
}

export const activarCuenta = (data) => {
    return baseApi.post('users/activation/', data)
}

export const actualizarContraseña = (data) => {
    return baseApi.post('users/reset_password/', data)
}

export const confirmarCambioContraseña = (data) => {
    return baseApi.post('users/reset_password_confirm/', data)
}

export const solicitarTokenAcceso = () => {
    const { RAT } = useSesionStore.getState()
    return baseApi.post('jwt/refresh/', { refresh: RAT })
}
import baseApi from '@/apis/base.api';
import type { Activate, Login, Register } from './auth.interfaces';

export const login = (data: Login) => {
    return baseApi.post('jwt/create', data)
}

export const registro = (data: Register) => {
    return baseApi.post('users/', data)
}

export const activarCuenta = (data: Activate) => {
    return baseApi.post('users/activation/', data)
}

export const cambiarContraseña = (data: any) => {
    return baseApi.post('users/reset_password/', data)
}

export const guardarNuevaContrasena = (data: any) => {
    return baseApi.post('users/reset_password_confirm/', data)
}
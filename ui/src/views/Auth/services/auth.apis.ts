import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";
import type { userData } from "./auth.interfaces";

export const getCredentials = async (data: any) => {
    const sesion = sesionStore()
    const response = await baseApi.post('jwt/create', data)
    sesion.setTokens(response.data)
    return response.status
}

export const storeUser = async (data: userData) => {
    return await baseApi.post('users/', data)
}

export const activateAccount = (data:any) => {
    return baseApi.post("users/activation/", data);
}


export const resetPassword = (data: any) => {
    return baseApi.post("users/reset_password/", data);
}

export const resetPasswordConfirm = (data: any) => {
    return baseApi.post("users/reset_password_confirm/", data);
}
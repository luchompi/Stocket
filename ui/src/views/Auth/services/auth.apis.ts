import baseApi from "@/apis/base.api";
import {sesionStore} from "@/stores/sesion.store";
import type {userData} from "./auth.interfaces";
import {getUserData} from '@/views/Profile/services/profile.apis'
import Swal from "sweetalert2";
import {getCompany} from "@/views/Empresa/services/empresa.services";

export const getCredentials = async (data: any) => {
    const sesion = sesionStore()
    const response = await baseApi.post('jwt/create', data)
    sesion.setTokens(response.data)
    await storeCompanyNIT()
    await getUserData()
    return response
}

export const storeUser = async (data: userData) => {
    return await baseApi.post('users/', data)
}

export const activateAccount = (data: any) => {
    return baseApi.post("users/activation/", data);
}


export const resetPassword = (data: any) => {
    return baseApi.post("users/reset_password/", data);
}

export const resetPasswordConfirm = (data: any) => {
    return baseApi.post("users/reset_password_confirm/", data);
}

export const refreshTokens = async () => {
    const sesion = sesionStore()
    if (sesion.isLogged) {
        const response = await baseApi.post('jwt/refresh', {refresh: `${sesion.RAT}`})
        if (response.status == 200) {
            sesion.setTokens(response.data)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error de Comunicación con el servidor',
                text: 'Se ha detectado un error de comunicación con el servidor, se cerrará la sesión y se perderán todas las operaciones que no se hayan procesado'
            })
            sesion.clearSesion()
        }
    }
}

export const storeCompanyNIT = async () => {
    const sesion = sesionStore()
    await getCompany()
    .then((Response)=>{
        sesion.setNIT(Response.data[0].NIT)
    })
}
import baseApi from "@/apis/base.api";
import {sesionStore} from "@/stores/sesion.store";

export const obtenerBajas = async () => {
    return await baseApi.get(`/gestion/bajas/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const obtenerBaja = async (id: any) => {
    return await baseApi.get(`/gestion/bajas/details/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}


export const obtenerElementosParaBaja = async () => {
    return await baseApi.get(`/gestion/bajas/elementos/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const crearBaja = async (elementos: any) => {
    return await baseApi.post(`/gestion/bajas/elementos/`, elementos, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const anularBaja = async(id: any) => {
    return await baseApi.delete(`/gestion/bajas/details/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}
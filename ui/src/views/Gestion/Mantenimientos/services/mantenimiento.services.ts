import baseApi from "@/apis/base.api";
import {sesionStore} from "@/stores/sesion.store";

export const obtenerMantenimientos = async () => {
    return await baseApi.get('gestion/mantenimientos/', {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const crearMantenimiento = async (elemento: any, data: any) => {
    return await baseApi.post(`gestion/mantenimientos/create/${elemento}/`, data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const obtenerMantenimiento = async (id: any) => {
    return await baseApi.get(`gestion/mantenimientos/details/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const actualizarMantenimiento = async (id: any, data: any) => {
    return await baseApi.put(`gestion/mantenimientos/details/${id}/`, data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const obtenerElementosEnMantenimiento = async () => {
    return await baseApi.get(`gestion/mantenimientos/elementos/en_proceso/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}
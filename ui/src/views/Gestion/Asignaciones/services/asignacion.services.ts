import baseApi from "@/apis/base.api";
import {sesionStore} from "@/stores/sesion.store";

export const getAsignaciones = async () => {
    return await baseApi.get('/gestion/asignaciones/', {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    });
}


export const findAsignaciones = async (id: any) => {
    return await baseApi.get(`/gestion/asignaciones/filter/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    });
}

export const getAsignacion = async (id: any) => {
    return await baseApi.get(`/gestion/asignaciones/details/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    });
}

export const getElementsinAsignment = async (id: any) => {
    return await baseApi.get(`/gestion/asignaciones/detalles/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    });
}
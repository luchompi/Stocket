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

/**
 * @param data 
 * @returns elementos que se pueden asignar a un funcionario, estos elementos son resultado
 * de la busqueda por placa, marca, categoria y modelo.
 */
export const findElementsToAsign = async (data: any) => {
    return await baseApi.post(`/gestion/asignaciones/detalles/disponibles/args/`, data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    });
}

/***
 * Este metodo guarda las asignaciones nuevas, con sus respectivos elementos
 */

export const createNewAsignment = async (data: any) => {
    return await baseApi.post(`/gestion/asignaciones/`, data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}
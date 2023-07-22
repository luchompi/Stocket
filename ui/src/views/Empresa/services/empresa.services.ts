import baseApi from "@/apis/base.api";
import type {empresaInterface} from "./empresa.interfaces";
import {sesionStore} from "@/stores/sesion.store";
import type {sedes} from "@/views/Empresa/sede/services/sedes.interfaces";
import { storeCompanyNIT } from "@/views/Auth/services/auth.apis";

/**
 * Estas son las funciones de api para empresa
 * */
export const getCompany = async () => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.get("empresa/");
}

export const storeCompany = async (data: empresaInterface) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    const response = await baseApi.post('empresa/', data)
    await storeCompanyNIT()
    return response
}

export const updateCompany = async (data: empresaInterface) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.put(`empresa/${data.id}/`, data)
}

/**
 * Estas son las apis para sedes
 * */

export const getSedes = async (NIT: string) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.get(`empresa/${NIT}/sedes/`)
}

export const storeSede = async (data: sedes, NIT: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.post(`empresa/${NIT}/sedes/`, data)
}

export const getSedeData = async (NIT: any, id: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.get(`empresa/${NIT}/sedes/${id}/`)
}

export const updateSede = async (data: sedes, NIT: any, id: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.put(`empresa/${NIT}/sedes/${id}/`, data)
}

export const deleteSede = async (NIT: any, id: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.delete(`empresa/${NIT}/sedes/${id}/`)
}

export const getSedeById = async (id: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.get(`empresa/${sesion.NIT}/sedes/${id}/`)
}

export const searchSede = async (data: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.get(`empresa/${sesion.NIT}/sedes/${data}/`)
}
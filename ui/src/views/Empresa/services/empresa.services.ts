import baseApi from "@/apis/base.api";
import type { empresaInterface } from "./empresa.interfaces";
import { sesionStore } from "@/stores/sesion.store";

export const getCompany = async () => {
    return await baseApi.get("empresa/");
}

export const storeCompany = async (data: empresaInterface) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.post('empresa/', data)
}

export const updateCompany = async (data: empresaInterface) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common["Authorization"] = `JWT ${sesion.PAT}`;
    return await baseApi.put(`empresa/${data.id}/`, data)
}
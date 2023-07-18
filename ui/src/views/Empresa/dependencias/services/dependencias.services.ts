import baseApi from "@/apis/base.api";
import {sesionStore} from "@/stores/sesion.store";
import type {Dependencia as dependenciaInterface} from "./dependencias.interfaces";

export const getDependencias = async () => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return await baseApi.get('empresa/dependencias/')
}

export const searchDependencias = async (data: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return await baseApi.get(`empresa/dependencias/search/${data}/`)
}

export const saveDependencias = async (data: dependenciaInterface) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return await baseApi.post('empresa/dependencias/', data)
}

export const getDependenciaById = async (id: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return await baseApi.get(`empresa/dependencias/${id}/`)
}

export const updateDependencia = async (id: any, data: dependenciaInterface) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return await baseApi.put(`empresa/dependencias/${id}/`, data)
}

export const deleteDependencia = async (id: any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return await baseApi.delete(`empresa/dependencias/${id}/`)
}
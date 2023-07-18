import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";

export const saveDependenciasBySede =  (sede:any,data:any) => {
    const sesion = sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`
    return baseApi.post(`empresa/sedes/${sede}/dependencias/`, data)
}
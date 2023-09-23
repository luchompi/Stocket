import baseApi from "@/apis/base.api";
import {sesionStore} from "@/stores/sesion.store";

export const doTraspaso = async(id:any,data:any) =>{
    const sesion = sesionStore()
    return await baseApi.put(`/gestion/asignaciones/details/${id}/`, data, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

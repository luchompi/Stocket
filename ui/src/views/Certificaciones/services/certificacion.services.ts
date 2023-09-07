import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";

export const obtenerCertificadoAsignacion = async(id:any) =>{
    return await baseApi.get(`/gestion/certificacion/asignacion/${id}/`,{
        headers:{
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}
import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";

export const getReferences = async(id:any)=>{
    return await baseApi.get(`/inventario/referencias/${id}/`,{
        headers:{
            Authorization:`JWT ${sesionStore().PAT}`
        }
    })
}

export const saveReferences = async(id:any,data:any)=>{
    return await baseApi.post(`/inventario/referencias/${id}/`,data,{
        headers:{
            Authorization:`JWT ${sesionStore().PAT}`
        }
    })
}

export const deleteReference = async(id:any) =>{
    return await baseApi.delete(`/inventario/referencias/details/${id}/`,{
        headers:{
            Authorization:`JWT ${sesionStore().PAT}`
        }
    })
}
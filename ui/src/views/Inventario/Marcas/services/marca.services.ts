import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";

export const getAllBrands = async () => {
    const sesion = sesionStore()
    return await baseApi.get(`/inventario/marcas/`,{
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const getBrand = async (id: any) => {
    const sesion = sesionStore()
    return await baseApi.get(`/inventario/marcas/search/${id}/`,{
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const deleteBrand = async (id: any) => {
    const sesion = sesionStore()
    return await baseApi.delete(`/inventario/marcas/${id}/`,{
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const saveBrand = async(data:any) =>{
    const sesion = sesionStore()
    return await baseApi.post(`/inventario/marcas/`,data,{
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const getBrandByID = async(id:any) =>{
    const sesion = sesionStore()
    return await baseApi.get(`/inventario/marcas/${id}/`,{
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const updateBrand = async (id:any,data:any) =>{
    const sesion = sesionStore()
    return await baseApi.put(`/inventario/marcas/${id}/`,data, {
        headers:{
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}
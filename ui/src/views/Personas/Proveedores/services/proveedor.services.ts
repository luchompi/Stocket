import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";
import type { AxiosPromise } from "axios";
import type { Suppliers } from "@/views/Personas/Proveedores/services/proveedor.interfaces";
import Swal from "sweetalert2";
import { errorValidator } from "@/hooks/errors.hooks";

export const getProveedores = async (): Promise<AxiosPromise<any>> => {
    const sesion = sesionStore()
    return await baseApi.get('personas/proveedores/', {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const saveProveedores = async (data: Suppliers): Promise<AxiosPromise<any>> => {
    const sesion = sesionStore()
    return await baseApi.post('personas/proveedores/', data, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const getProveedoresByNameOrNIT = async (id: string): Promise<AxiosPromise<any>> => {
    const sesion = sesionStore()
    return await baseApi.get(`personas/proveedores/search/${id}/`, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const getProveedoresById = async (id: any) => {
    const sesion = sesionStore()
    return await baseApi.get(`personas/proveedores/${id}/`,
        {
            headers: {
                Authorization: `JWT ${sesion.PAT}`
            }
        })
}

export const updateProveedor = async (id: any, data: Suppliers) => {
    const sesion = sesionStore()
    return await baseApi.put(`personas/proveedores/${id}/`, data,
        {
            headers: {
                Authorization: `JWT ${sesion.PAT}`
            }
        })
}

export const deleteProveedor = async (id: any) => {
    const sesion = sesionStore()
    return await baseApi.delete(`personas/proveedores/${id}/`,
        {
            headers: {
                Authorization: `JWT ${sesion.PAT}`
            }
        })
}
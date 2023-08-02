import baseApi from "@/apis/base.api";
import { errorValidator } from "@/hooks/errors.hooks";
import { sesionStore } from "@/stores/sesion.store";
import Swal from "sweetalert2";

export const getAllCategories = async () => {
    return await baseApi.get(`/inventario/categorias/`,
        {
            headers: {
                Authorization: `JWT ${sesionStore().PAT}`
            }
        })
}

export const getCategoriesByName = async (name: string) => {
    return await baseApi.get(`/inventario/categorias/search/${name}`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const saveCategory = async (data: any) => {
    await baseApi.post(`/inventario/categorias/`, data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
        .then((Response) => {
            Swal.fire({
                icon: 'success',
                title: 'Procesado',
                text: 'Se ha guardado la categoría con éxito',
                timer: 2000,
                timerProgressBar: true
            })
        })
        .catch((error)=>{
            const reciever = errorValidator(error.response.data)
            Swal.fire({
                icon:'error',
                title:'Error',
                text:reciever
            })
        })
        .finally(()=>{
            return Response
        })
}


export const deleteCategory = async(id:string) =>{
    const response = await baseApi.delete(`/inventario/categorias/${id}/`,{
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
    if (response.status == 204) {
        Swal.fire({
            icon:'success',
            title: 'Eliminado',
            text: 'Se ha eliminado la categoría con éxito',
            timer: 2000,
            timerProgressBar: true
        })
    }
    else {
        const reciever = errorValidator(response.data)
        Swal.fire({
            icon:'error',
            title:'Error',
            text:reciever
        })
    }
    return response.status
}

export const getCategoryById = async (id: any) =>{
    const response = await baseApi.get(`/inventario/categorias/${id}/`,{
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
    return response.data
}

export const updateCategory = async (id: any, data: any) =>{
    const response = await baseApi.put(`/inventario/categorias/${id}/`,data,{
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
    if (response.status == 200) {
        Swal.fire({
            icon:'success',
            title: 'Actualizado',
            text: 'Se ha actualizado la categoría con éxito',
            timer: 2000,
            timerProgressBar: true
        })
    }
    else {
        const reciever = errorValidator(response.data)
        Swal.fire({
            icon:'error',
            title:'Error',
            text:reciever
        })
    }
    return response.status
}
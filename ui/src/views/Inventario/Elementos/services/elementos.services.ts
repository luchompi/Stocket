import baseApi from "@/apis/base.api";
import {errorValidator} from "@/hooks/errors.hooks";
import {sesionStore} from "@/stores/sesion.store";
import Swal from "sweetalert2";

export const getAllElements = async () => {
    return await baseApi.get('/inventario/elementos/',
        {
            headers: {
                Authorization: `JWT ${sesionStore().PAT}`
            }
        });
}

export const getElementById = async (id: any) => {
    return await baseApi.get(`/inventario/elementos/${id}/`, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
}

export const saveElement = async (data: Element) => {
    await baseApi.post('/inventario/elementos/', data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
        .then((Response) => {
            Swal.fire({
                icon: 'success',
                title: 'Elemento guardado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            return Response
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar el elemento',
                text: errorValidator(error.response.data),
                showConfirmButton: false,
                timer: 1500
            })
        })
}


export const updateElement = async (placa: any, data: any): Promise<any> => {
    await baseApi.put(`/inventario/elementos/${placa}/`, data, {
        headers: {
            Authorization: `JWT ${sesionStore().PAT}`
        }
    })
        .then((Response) => {
            Swal.fire({
                icon: 'success',
                title: 'Elemento actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            return true
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el elemento',
                text: errorValidator(error.response.data),
                showConfirmButton: false,
                timer: 1500
            })
            return false
        })
}
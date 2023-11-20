import baseApi from "@/apis/base.api";
import useSesionStore from "@/stores/sesion.store";

export const obtenerDependencias = () => {
    const sesion = useSesionStore()
    return baseApi.get('/empresa/dependencias/',
        {
            headers: {
                'Authorization': `JWT ${sesion.PAT}`
            }
        })
}

export const guardarDependencia = (data: any) => {
    const sesion = useSesionStore()
    return baseApi.post('/empresa/dependencias/', data, {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    })

}

export const modificarDependencia = (id: number, data: any) => {
    const sesion = useSesionStore()
    return baseApi.patch(`/empresa/dependencias/${id}/`, data, {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    })
}

export const borrarDependencia = (id: number) => {
    const sesion = useSesionStore()
    return baseApi.delete(`/empresa/dependencias/${id}/`, {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    })
}

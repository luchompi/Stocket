import baseApi from "@/apis/base.api";
import useSesionStore from "@/stores/sesion.store";
import type { Sede } from "./sedes.interfaces";
export const obtenerSedes = () => {
    const sesion = useSesionStore()
    return baseApi.get('empresa/sedes/', {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    });
}

export const obtenerSede = (name: any) => {
    const sesion = useSesionStore()
    return baseApi.get(`empresa/sedes/search/${name}/`, {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    });
}

export const guardarSede = (sede: Sede) => {
    const sesion = useSesionStore()
    return baseApi.post('empresa/sedes/', sede, {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    });
}

export const borrarSede = (id: any) => {
    const sesion = useSesionStore()
    return baseApi.delete(`empresa/sedes/${id}/`,
        {
            headers: {
                'Authorization': `JWT ${sesion.PAT}`
            }
        });
}

export const actualizarSede = (sede: Sede, id: any) => {
    const sesion = useSesionStore()
    return baseApi.patch(`empresa/sedes/${id}/`, sede, {
        headers: {
            'Authorization': `JWT ${sesion.PAT}`
        }
    });
}
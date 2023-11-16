import baseApi from "@/apis/base.api";
import useSesionStore from "@/stores/sesion.store";
import type {Company} from "./empresa.interfaces";

export const obtenerDatosEmpresa = () => {
    const sesion = useSesionStore()
    return baseApi.get('empresa/', {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    });
}

export const guardarDatosEmpresa = (data: Company) => {
    const sesion = useSesionStore()
    return baseApi.post('empresa/', data, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const actualizarDatosEmpresa = (data: Company) => {
    const sesion = useSesionStore()
    return baseApi.patch('empresa/', data, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}
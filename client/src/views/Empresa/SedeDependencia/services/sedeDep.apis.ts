import baseApi from "@/apis/base.api";
import useSesionStore from "@/stores/sesion.store";

export const obtenerDatos = async (id: any) => {
    const sesion = useSesionStore()
    return baseApi.get(`/empresa/sedes/${id}/dependencias/`, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}
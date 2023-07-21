import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";

export const getAllEmployees = async () => {
    const sesion = sesionStore()
    return await baseApi.get('/personas/funcionarios/', {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    });
}
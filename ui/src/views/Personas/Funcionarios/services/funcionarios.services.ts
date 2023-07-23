import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";
import type { Employee } from "./funcionarios.interfaces";
import type { AxiosResponse } from "axios";
import {Axios} from "axios";

export const getAllEmployees = async () => {
    const sesion = sesionStore()
    return await baseApi.get('/personas/funcionarios/', {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    });
}

export const saveEmployee = async (data:Employee): Promise<AxiosResponse<any>> => {
    const sesion = sesionStore()
    return await baseApi.post('/personas/funcionarios/', data, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const getEmployeeById = async (id:any): Promise<AxiosResponse<any>> => {
    const sesion = sesionStore()
    return await baseApi.get(`/personas/funcionarios/${id}/`, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const updateEmployee = async (id:any, data:Employee): Promise<AxiosResponse<any>> => {
    const sesion = sesionStore()
    return await baseApi.put(`/personas/funcionarios/${id}/`, data, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

export const deleteEmployee = async (id:any): Promise<AxiosResponse<any>> => {
    const sesion = sesionStore()
    return await baseApi.delete(`/personas/funcionarios/${id}/`, {
        headers: {
            Authorization: `JWT ${sesion.PAT}`
        }
    })
}

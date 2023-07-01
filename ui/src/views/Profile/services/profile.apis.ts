import baseApi from "@/apis/base.api";
import { sesionStore } from "@/stores/sesion.store";

export const getUserData = async() =>{
    const sesion=sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`;
    const response = await baseApi.get('users/me/');
    sesion.setUserData(response.data)
}

export const updateUserData = async(data:any) =>{
    const sesion=sesionStore()
    baseApi.defaults.headers.common['Authorization'] = `JWT ${sesion.PAT}`;
    const response = await baseApi.patch('users/me/',data);
    sesion.setUserData(response.data)
    return response
}
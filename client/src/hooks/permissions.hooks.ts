import { sesionStore } from "@/stores/sesion.store";

export const comprobarRolUsuario = () =>{
    const sesion = sesionStore()
    if(sesion.UserData[0]?.groups?.includes('Administradores','Administrador','Encargado') || sesion.UserData[0]?.is_superuser){
        return true
    }
    return false
}
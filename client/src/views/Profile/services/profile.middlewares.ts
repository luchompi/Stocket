import { sesionStore } from "@/stores/sesion.store"
export const checkFullData =  () => {
    const sesion = sesionStore()
    if (sesion.UserData[0]?.first_name === "" 
    || sesion.UserData[0]?.last_name === "" 
    || sesion.UserData[0]?.phone === null 
    || sesion.UserData[0]?.address === null 
    || sesion.UserData[0]?.uid === null) {  
        return false
    }
    return true
}

export const checkForm = (data:any) => {
    if (data.first_name.value || data.last_name.value || data.email.value || data.address.value || data.city.value || data.uid.value || data.phone.value) {
        return false
    } else {
         return true
    }
}
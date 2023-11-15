import baseApi from "@/apis/base.api";
import useSesionStore from "@/stores/sesion.store";
export const actualizarDatosUsuario = (data: any) => {
    const store = useSesionStore()
    return baseApi.patch('users/me/', data, {
        headers: {
            'Authorization': `JWT ${store.PAT}`
        }
    });
}
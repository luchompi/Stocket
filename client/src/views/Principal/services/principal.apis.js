import baseApi from "../../../apis/base.api.js";
import sesionStore from "../../../store/sesion.store.js";

export const obtenerDatosUsuario = () => {
    const { PAT } = sesionStore.getState();

    return baseApi.get("users/me/", {
        headers: {
            Authorization: `JWT ${PAT}`
        }
    });

}
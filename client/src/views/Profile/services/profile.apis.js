import baseApi from '../../../apis/base.api';
import useSesionStore from '../../../store/sesion.store';

export const actualizarPerfilUsuario = (data) => {
    const { PAT } = useSesionStore.getState();
    return baseApi.patch('/users/me/', data, {
        headers: {
            Authorization: `JWT ${PAT}`
        }
    })
}
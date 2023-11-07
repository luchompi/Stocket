import baseApi from '../../../apis/base.api'
import useSesionStore from '../../../store/sesion.store'

export const obtenerDatosEmpresa = () => {
    const { PAT } = useSesionStore.getState()
    return baseApi.get('empresa/', {
        headers: {
            Authorization: `JWT ${PAT}`
        }
    })
}

export const actualizarDatosEmpresa = (NIT, data) => {
    const { PAT } = useSesionStore.getState()
    return baseApi.put(`empresa/${NIT}/`, data, {
        headers: {
            Authorization: `JWT ${PAT}`
        }
    })
}
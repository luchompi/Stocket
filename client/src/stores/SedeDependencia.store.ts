import { defineStore } from 'pinia'
import useSesionStore from './sesion.store'
import { obtenerDatos } from '../views/Empresa/SedeDependencia/services/sedeDep.apis'
import type { SedeDependencia } from '../views/Empresa/SedeDependencia/services/sedep.interfaces'
import { ref } from "vue";

const useSedeDependenciaStore = defineStore('sedeDependencia', () => {
    const sesion = useSesionStore();
    const data = ref({} as SedeDependencia);
    const fetched = ref<boolean>(false);
    const getData = async (id: any) => {
        if (data.value.id !== id && !fetched.value) {
            sesion.setLoadingStatus(true)
            await obtenerDatos(id)
                .then((Response) => {
                    data.value = Response.data
                }).catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    fetched.value = true
                    sesion.setLoadingStatus(false)
                })
        }
        fetched.value = false
    }

    return {
        data,
        getData
    }

})

export default useSedeDependenciaStore
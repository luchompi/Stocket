import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useRouter} from 'vue-router'
import type {Company} from '@/views/Empresa/services/empresa.interfaces'
import useSesionStore from './sesion.store'
import {actualizarDatosEmpresa, guardarDatosEmpresa, obtenerDatosEmpresa} from '@/views/Empresa/services/empresa.apis'
import {errorMessage, successMessage} from "@/components/messages";

const useEmpresaStore = defineStore('empresa', () => {
    const url = useRouter()
    const empresaData = ref({} as Company)
    const store = useSesionStore()

    const obtenerDatos = async () => {
        store.setLoadingStatus(true)
        await obtenerDatosEmpresa()
            .then((Response) => {
                empresaData.value = Response.data as Company
            })
            .finally(() => {
                store.setLoadingStatus(false)
            })
    }

    const crearEmpresa = async (data: Company) => {
        store.setLoadingStatus(true)
        await guardarDatosEmpresa(data)
            .then((Response) => {
                empresaData.value = Response.data as Company
                successMessage('¡Hecho!', 'Datos guardados correctamente')
                url.push({name: 'Empresa'})
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                store.setLoadingStatus(false)
            })
    }

    const actualizarEmpresa = async (data: Company) => {
        store.setLoadingStatus(true)
        await actualizarDatosEmpresa(data)
            .then((Response) => {
                empresaData.value = Response.data as Company
                successMessage('¡Hecho!', 'Datos guardados correctamente')
                url.push({name: 'Empresa'})
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                store.setLoadingStatus(false)
            })

    }

    const eliminarStore = () => {
        empresaData.value = {} as Company
    }

    return {
        empresaData,
        obtenerDatos,
        eliminarStore,
        crearEmpresa,
        actualizarEmpresa,

    }
})

export default useEmpresaStore
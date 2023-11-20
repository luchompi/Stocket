import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import useSesionStore from './sesion.store'
import type { Dependencia } from '@/views/Empresa/Dependencias/services/dependenicas.interfaces'
import {
    borrarDependencia,
    guardarDependencia,
    modificarDependencia,
    obtenerDependencias
} from '@/views/Empresa/Dependencias/services/dependencias.apis'
import { errorMessage, successMessage, warningMessage } from "@/components/messages";

const useDependenciaStore = defineStore('dependencia', () => {
    const url = useRouter()
    const sesion = useSesionStore()
    const dependencias = ref([] as Dependencia[])
    const dependencia = ref({} as Dependencia)
    const dependenciaBackup = ref([] as Dependencia[])

    const cargarDependencias = async () => {
        await obtenerDependencias()
            .then((Response) => {
                dependencias.value = Response.data
                dependenciaBackup.value = Response.data
            })
    }

    const buscarDependencia = (name: string) => {
        if (name === '') {
            dependencias.value = dependenciaBackup.value
        } else {
            dependencias.value = dependenciaBackup.value.filter((dependencia) => {
                return dependencia.name.toLowerCase().includes(name.toLowerCase())
            })
        }
    }

    const crearDependencias = async (item: any) => {
        sesion.setLoadingStatus(true)
        await guardarDependencia(item)
            .then((Response) => {
                cargarDependencias()
                successMessage('¡Hecho!', 'Se ha creado la dependencia exitosamente')
                url.push('/empresa/departamentos')
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                sesion.setLoadingStatus(false)
            })
    }

    const actualizarDependencia = async (item: any) => {
        await warningMessage('¡Atención!', '¿Está seguro que desea actualizar esta dependencia?')
            .then((result) => {
                if (result) {
                    sesion.setLoadingStatus(true)
                    modificarDependencia(item.id, item)
                        .then((Response) => {
                            dependencias.value.map((dependencia) => {
                                if (dependencia.id === item.id) {
                                    dependencia.name = item.name
                                    dependencia.description = item.description
                                }
                            })
                            successMessage('¡Hecho!', 'Se ha actualizado la dependencia exitosamente')
                            url.push('/empresa/departamentos')
                        })
                        .catch((error) => {
                            errorMessage(error.response.data)
                        })
                        .finally(() => {
                            sesion.setLoadingStatus(false)
                        });
                }
            })
    }

    const eliminarDependencia = async (id: number) => {
        await warningMessage('¡Atención!', '¿Está seguro que desea eliminar esta dependencia?')
            .then((result) => {
                if (result) {
                    sesion.setLoadingStatus(true)
                    borrarDependencia(id)
                        .then((Response) => {
                            dependencias.value = dependencias.value.filter((dependencia) => {
                                return dependencia.id !== id
                            })
                            dependenciaBackup.value = dependencias.value
                            successMessage('¡Hecho!', 'Se ha eliminado la dependencia exitosamente')
                        })
                        .catch((error) => {
                            errorMessage(error.response.data)
                        })
                        .finally(() => {
                            sesion.setLoadingStatus(false)
                        })
                }
            })
    }

    return {
        dependencias,
        dependencia,
        cargarDependencias,
        buscarDependencia,
        eliminarDependencia,
        crearDependencias,
        actualizarDependencia,
    }
})

export default useDependenciaStore
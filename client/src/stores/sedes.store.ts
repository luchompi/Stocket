import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Sede } from '@/views/Empresa/Sedes/services/sedes.interfaces'
import { borrarSede, guardarSede, obtenerSedes, obtenerSede, actualizarSede } from '@/views/Empresa/Sedes/services/sedes.apis'
import useEmpresaStore from './empresa.store'
import { errorMessage, successMessage, warningMessage } from '@/components/messages'
import useSesionStore from './sesion.store'
import { useRouter } from 'vue-router'
const useSedeStore = defineStore('sedes', () => {
    const url = useRouter()
    const sedes = ref([] as Sede[])
    const backupSedes = ref([] as Sede[])
    const sede = ref({} as Sede)
    const empresa = useEmpresaStore()
    const loading = useSesionStore()
    const cargarSedes = async () => {
        await obtenerSedes()
            .then((Response) => {
                sedes.value = Response.data
                backupSedes.value = sedes.value
            })
    }

    const crearSede = async (sede: Sede) => {
        loading.setLoadingStatus(true)
        const data = { ...sede, empresa: empresa.empresaData.NIT }
        await guardarSede(data)
            .then((Response) => {
                backupSedes.value.unshift(data)
                if (backupSedes.value.length > 5) {
                    backupSedes.value.pop()
                }
                successMessage('¡Hecho!', 'Sede creada correctamente')
                url.push({ name: 'SedeList' })
            })
            .catch((error) => {
                errorMessage(error.response.data)
            })
            .finally(() => {
                loading.setLoadingStatus(false)
            })
    }

    const buscarSede = (nombre: any) => {
        if (nombre == "") {
            sedes.value = backupSedes.value
        } else {
            sedes.value = sedes.value.filter((sede) => sede.name.toLowerCase().includes(nombre.toLowerCase()))
        }
    }

    const eliminarSede = async (id: any) => {
        await warningMessage('¡Atención!', '¿Está seguro que desea eliminar esta sede?')
            .then((result) => {
                if (result == true) {
                    loading.setLoadingStatus(true)
                    borrarSede(id)
                        .then((Response) => {
                            successMessage('¡Hecho!', 'Sede eliminada correctamente')
                            sedes.value = sedes.value.filter((sede) => sede.id !== id)
                            backupSedes.value = backupSedes.value.filter((sede) => sede.id !== id)
                        })
                        .catch((error) => {
                            errorMessage(error.response.data)
                        })
                        .finally(() => {
                            loading.setLoadingStatus(false)
                        })
                }
                else {
                    successMessage('¡Hecho!', 'Sede no eliminada')
                }
            })
    }

    const modificarSede = async (sede: Sede, id: any) => {
        await warningMessage('¡Atención!', '¿Está seguro que desea actualizar esta sede?')
            .then((result) => {
                if (result == true) {
                    loading.setLoadingStatus(true)
                    actualizarSede(sede, id)
                        .then((Response) => {
                            successMessage('¡Hecho!', 'Sede actualizada correctamente')
                            //itero el array con los datos de las sedes, localizo la que se recibe por argumento y guardo los datos nuevos
                            sedes.value.map((item) => {
                                if (item.id == id) {
                                    item.name = sede.name
                                    item.address = sede.address
                                    item.phone = sede.phone
                                    item.email = sede.email
                                    item.description = sede.description
                                    item.web = sede.web
                                }
                            })
                            backupSedes.value = sedes.value
                            url.push({ name: 'SedeList' })
                        })
                        .catch((error) => {
                            errorMessage(error.response.data)
                        })
                        .finally(() => {
                            loading.setLoadingStatus(false)
                        })
                }
            })
    }

    return {
        sedes,
        sede,
        cargarSedes,
        crearSede,
        buscarSede,
        eliminarSede,
        modificarSede
    }

})

export default useSedeStore
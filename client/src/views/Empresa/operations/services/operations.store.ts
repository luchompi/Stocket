import {ref} from 'vue'
import {defineStore} from 'pinia'
import {saveDependenciasBySede} from './operations.services'
import Swal from 'sweetalert2'
import {useRouter} from 'vue-router'
import {sesionStore} from "@/stores/sesion.store";

export const operationStore = defineStore('operation', () => {
    const json = ref<any>([])
    const id = ref<number>(0)
    const url = useRouter()
    const sesion = sesionStore()

    const setDataToJson = (data: any) => {
        if (!json.value.some((item: any) => item.dependencia_id === data.dependencia)) {
            json.value = [...json.value, {
                id: id.value,
                sede_id: data.sede,
                dependencia_id: data.dependencia,
                dependencia_nombre: data.dependencia_nombre
            }]
            id.value += 1
        }
    }

    const removeDataFromJson = (data: any) => {
        json.value = json.value.filter((item: any) => item.dependencia_id !== data.dependencia_id)
    }

    const clearJsonData = () => {
        json.value = []
    }

    const saveData = async (sede_id: any) => {
        const response = await saveDependenciasBySede(sede_id, json)
        if (response.status == 201) {
            clearJsonData()
            Swal.fire({
                icon: 'success',
                title: 'Hecho',
                text: 'Operación realizada con éxito',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
            url.push({name: 'sedes-detail', params: {nit: sesion.NIT, id: sede_id}})
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo realizar la operación',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }


    return {
        json,
        setDataToJson,
        removeDataFromJson,
        clearJsonData,
        saveData
    }
})

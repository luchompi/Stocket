import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Element } from '@/views/Inventario/Elementos/services/elementos.interfaces'
import type { Employee } from '@/views/Personas/Funcionarios/services/funcionarios.interfaces'
import Swal from 'sweetalert2'
import {createNewAsignment} from './asignacion.services'
import { useRouter } from 'vue-router'

export const asignacionStore = defineStore('asignacionStore', () => {
    const employee = ref({} as Employee | null)
    const elements = ref([] as Element[])
    const url = useRouter()

    const setEmployee = (data: any) => {
        employee.value = data
    }

    const setElements = (data: Element) => {
        if (!elements.value.find((el: Element) => el.placa === data.placa)) {
            elements.value.push(data)
        }
    }

    const removeElement = (data: Element) => {
        elements.value = elements.value.filter((el: Element) => el.placa !== data.placa)
    }

    const reset = () => {
        employee.value = null
        elements.value = []
    }

    const resetElements = () => {
        elements.value = []
    }

    const process = async () =>{
        const data ={
            funcionario: employee.value,
            elementos: elements.value
        }
        const response = await createNewAsignment(data)
        if(response.status == 201){
            reset()
            url.push({name: 'asig-detail', params: {id: response.data.id}})	
            Swal.fire({
                icon: 'success',
                title: 'Asignación realizada',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        }
        
    }

    return {
        employee,
        elements,
        setEmployee,
        setElements,
        removeElement,
        resetElements,
        reset,
        process
    }
})
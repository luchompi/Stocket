import { ref} from 'vue'
import {defineStore} from 'pinia'
import { useRouter } from 'vue-router'
import { saveReferences } from './referencias.services'
import Swal from 'sweetalert2'
import { errorValidator } from '@/hooks/errors.hooks'

const url = useRouter()

export const referenciasStore = defineStore('referencias', () => {
    const marca = ref<any>([])

    const addMarca = (data: any) => {
        if(!marca.value.some((item: any) => item.id === data.id)){
           marca.value =[...marca.value, {
                id: data.id,
                name: data.name
           }]
        }
    }
    
    const deleteMarca = (id: number) => {
        marca.value = marca.value.filter((item: any) => item.id !== id)
    }



    const emptyMarcas = () => {
        marca.value = []
    }

    const procesar = async(id:any) =>{
        await saveReferences(id,marca.value)
        .then((Response)=>{
            Swal.fire({
                icon: 'success',
                title: 'Referencias guardadas con exito',
                showConfirmButton: false,
                timer: 1500
            })
            emptyMarcas()
            return Response
        })
        .catch((error)=>{
            const reciever = errorValidator(error.response.data)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: reciever,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        })
    }

    return {
        marca,
        addMarca,
        deleteMarca,
        emptyMarcas,
        procesar
    }
})

import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type {Element} from "@/views/Inventario/Elementos/services/elementos.interfaces";
import {crearBaja} from "@/views/Gestion/Bajas/services/bajas.services";
import Swal from "sweetalert2";
import {errorValidator} from "@/hooks/errors.hooks";
import {useRouter} from "vue-router";

export const bajaStore = defineStore('baja', () => {
    const elements = ref([] as Element[])
    const noElementos = computed(() => elements.value.length === 0)
    const url = useRouter()
    const añadirElemento = (elemento: Element) => {
        if (!elements.value.find(e => e.placa === elemento.placa)) {
            elements.value.push(elemento)
        }
    }

    const eliminarElemento = (elemento: Element) => {
        elements.value = elements.value.filter(e => e.placa !== elemento.placa)
    }

    const limpiarElementos = () => {
        elements.value = []
    }

    const procesar = async () => {
        await crearBaja(elements.value)
            .then((Response) => {
                Swal.fire({
                    title: 'Baja creada',
                    text: 'La baja se ha creado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    timer: 2000,
                    timerProgressBar: true
                })
                limpiarElementos()
                url.push({name: 'bajas-list'})
            })
            .catch((error) => {
                const resiever = errorValidator(error.response.data)
                Swal.fire({
                    title: 'Error',
                    text: resiever,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            })
    }

    return {
        elements,
        noElementos,
        añadirElemento,
        eliminarElemento,
        limpiarElementos,
        procesar
    }
})

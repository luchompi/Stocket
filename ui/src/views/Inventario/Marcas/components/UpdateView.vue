<template>
    <div v-if="loading">
        Espere ...
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="row" v-else>
        <div class="col col-lg-9">
            <FormView :marca="marca" @onUpdateData="onUpdateData" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getBrandByID, updateBrand } from '../services/marca.services';
import FormView from './FormView.vue'
import Swal from 'sweetalert2';
import { errorValidator } from '@/hooks/errors.hooks';

const url = useRouter();
const loading = ref<boolean>(false);
const marca = ref<any>(null);

onMounted(() => {
    getData()
})

const proceed = async (id: any, data: any) => {
    loading.value = true
    await updateBrand(id, data)
        .then((Response) => {
            Swal.fire({
                icon: 'success',
                title: 'Hecho',
                text: 'Se ha procesado la petición correctamente'
            })
            url.push({ name: 'marcas' })
        })
        .catch((error) => {
            const reciever = errorValidator(error.response.data)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: reciever
            })
        })
        .finally(() => {
            loading.value = false
        })

}

const onUpdateData = (data: any) => {
    Swal.fire({
        icon: 'question',
        title: '¿Está seguro?',
        text: 'Este proceso no se puede revertir'
    })
        .then((result) => {
            if (result.isConfirmed) {
                proceed(url.currentRoute.value.params.id, data)
            }
        })
}

const getData = async () => {
    loading.value = true
    marca.value = (await getBrandByID(url.currentRoute.value.params.id)).data
    loading.value = false
}
</script>
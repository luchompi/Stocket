<script setup lang="ts">
import FormView from './FormView.vue'
import {saveElement} from '../services/elementos.services'
import { useRouter } from 'vue-router';
import {ref} from 'vue'

const loading = ref<boolean>(false)
const url = useRouter()

const onSaveData = async(data:Element) =>{
    loading.value = true
    await saveElement(data)
    .then((Response)=>{
        url.push({name:'elementos-list'})
    })
    .finally(()=>{
        loading.value = false
    })
}
</script>

<template>
    <h5>Ingresar los datos solicitados</h5>
    <div v-if="loading">
        Espere ...
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <FormView @onSaveData="onSaveData"/>
    </div>
</template>
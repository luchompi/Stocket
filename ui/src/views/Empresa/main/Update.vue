<template>
    <h3>Actualizar datos de empresa</h3>
    <p>Ingrese los datos a modificar</p>
    <div class="row">
        <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Datos actuales de la entidad</h5>
                <DataComponent :empresa="queryset"/>
              </div>
            </div>
        </div>
        <div class="col">
            <formComponent :empresa="queryset" @onUpdate="onUpdate"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import type { empresaInterface } from '../services/empresa.interfaces';
import { getCompany, updateCompany } from '../services/empresa.services';
import formComponent from './components/formComponent.vue'
import DataComponent from './components/dataComponent.vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const queryset = ref([] as empresaInterface[])
const url = useRouter()
onMounted(async()=>{
    const response = await getCompany()
    queryset.value = response.data
})

const onUpdate = async(data:empresaInterface) => {
    const response = await updateCompany(data)
    if(response.status == 200){
        Swal.fire({
            icon:'success',
            title:'Actualizado',
            text:'Datos actualizados correctamente',
            showConfirmButton: false,
            timer: 1500
        })
        url.push({name:'empresa'})
    }
}
</script>
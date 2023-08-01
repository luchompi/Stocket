<template>
<div class="row">
    <div class="col">
        <FormView @onSaveData="onSaveData"/>
    </div>
</div>
</template>
<script setup lang="ts">
import FormView from './FormView.vue';
import { saveCategory } from '../services/categoria.services';
import { useRouter } from 'vue-router';

const url = useRouter()
const onSaveData = async(data:any) => {
    console.log(data)
    await saveCategory(data)
    .then((Response)=>{
        url.push({name:'categorias'})
    })
}

</script>
<template>
  <div class="card-text" v-if="loading">
    Espere ...
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
<div class="card-text" v-else>
  <h5>Ingrese los datos a modificar</h5>
  <FormView :categoria="queryset" @onUpdateData="onUpdateData"/>
</div>

</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import type {Category} from '../services/categoria.interfaces'
import {getCategoryById,updateCategory} from '../services/categoria.services';
import {useRouter} from 'vue-router'
import FormView from './FormView.vue'
import Swal from 'sweetalert2';
const queryset = ref({} as Category)
const url = useRouter()
const loading = ref<boolean>(false)
onMounted(async()=>{
  loading.value = true
  const id = url.currentRoute.value.params.id
  const data = await getCategoryById(id)
  queryset.value = data
  loading.value = false
})

const proceed = async(data:Category) =>{
  const id = url.currentRoute.value.params.id
  const response = await updateCategory(id,data)
  if(response === 200){
    Swal.fire({
      icon: 'success',
      title: 'Categoría actualizada',
      showConfirmButton: false,
      timer: 1500
    })
    url.push({name:'categorias'})
  }
}

const onUpdateData = (data:Category) =>{
  Swal.fire({
    icon:'question',
    title:'¿Está seguro de actualizar la categoría?',
    showCancelButton:true,
    confirmButtonText:'Sí, actualizar',
    cancelButtonText:'Cancelar'
  }).then((result)=>{
    if(result.isConfirmed){
      proceed(data)
    }
  })
}

</script>
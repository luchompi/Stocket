<template>

  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Ingresar nuevos datos</h4>
      <formComponent @onSave="onSave"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { empresaInterface } from '../services/empresa.interfaces';
import formComponent from './components/formComponent.vue';
import { storeCompany } from '../services/empresa.services';
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2'
import {errorValidator} from '@/hooks/errors.hooks'
const url = useRouter()


const onSave = async(data:empresaInterface) => {
  await storeCompany(data)
  .then((Response)=>{
    url.push({name:'empresa'})
  })
  .catch((error)=>{

    const resiever = errorValidator(error.response.data)
    Swal.fire({
      icon:'error',
      title:'error',
      text:resiever,
      showConfirmButton: false,
      timer: 1500
    })
  })

}
</script>
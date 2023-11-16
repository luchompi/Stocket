<template>
  <form @submit="handleSubmit">
    <div class="row">
      <div class="col">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="inputNIT" placeholder="name@example.com"
                 :required="!empresa.empresaData.NIT" v-model="data.NIT" @input="handleChange"/>
          <label for="inputNIT">Especifique NIT</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="inputName" placeholder="name@example.com"
                 :required="!empresa.empresaData.name" v-model="data.name" @input="handleChange"/>
          <label for="inputName">Razón Social</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="inputAddress" placeholder="name@example.com"
                 :required="!empresa.empresaData.address" v-model="data.address" @input="handleChange"/>
          <label for="inputAddress">Dirección</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="inputNIT" placeholder="name@example.com"
                 :required="!empresa.empresaData.phone" v-model="data.phone" @input="handleChange"/>
          <label for="inputNIT">Teléfono de contacto</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="inputMail" placeholder="name@example.com"
                 :required="!empresa.empresaData.email" v-model="data.email" @input="handleChange"/>
          <label for="inputMail">Correo Electrónico</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="inputLink" placeholder="name@example.com" v-model="data.web"
                 @input="handleChange"/>
          <label for="inputLink">Sitio web</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
                    <textarea class="form-control" v-model="data.description" @input="handleChange"
                              placeholder="Escriba una descripción de su empresa" id="floatingTextarea"></textarea>
          <label for="floatingTextarea">Descripción</label>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-warning" v-if="empresa.empresaData.NIT">Actualizar <i
        class="bi bi-pencil"></i></button>
    <button type="submit" class="btn btn-success" v-else>Guardar <i class="bi bi-save"></i></button>
  </form>
</template>
<script setup lang="ts">
import type {Company} from '../services/empresa.interfaces';
import {ref} from 'vue'
import useEmpresaStore from '@/stores/empresa.store';

const empresa = useEmpresaStore()
const data = ref({} as Company)

const emits = defineEmits(['onUpdateEmpresa', 'onCreateEmpresa'])
empresa.empresaData.NIT ? data.value = empresa.empresaData : data.value = {} as Company
const handleChange = (e: any) => {
  data.value = {...data.value, [e.target.name]: e.target.value}
}


const handleSubmit = (e: any) => {
  e.preventDefault()
  empresa.empresaData.NIT ? emits('onUpdateEmpresa', data.value) : emits('onCreateEmpresa', data.value)
}
</script>
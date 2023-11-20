<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import EditDocument from '@/assets/Icons/EditDocument.json';
import { useRouter } from 'vue-router';
import type { Dependencia } from "@/views/Empresa/Dependencias/services/dependenicas.interfaces";
import { ref } from 'vue';
import useDependenciaStore from "@/stores/dependencias.store";

const url = useRouter()
const id = url.currentRoute.value.params.id
const store = useDependenciaStore()
const data = ref({} as Dependencia);

if (id) {
  const iden = Array.isArray(id) ? id[0] : id;
  data.value = store.dependencias.find((item) => item.id === parseInt(iden)) as Dependencia
}

const handleSubmit = (e: any) => {
  !id ? store.crearDependencias(data.value) : store.actualizarDependencia(data.value)
}

const handleInput = (e: any) => {
  data.value = { ...data.value, [e.target.name]: e.target.value }
}

</script>
<template>
  <div class="row">
    <Animations :animation-data="EditDocument" :style="{ width: '100px', height: '100px' }" />
    <div class="col">
      <form @submit.prevent="handleSubmit">
        <div class="form-floating mb-3">
          <input type="text" v-model="data.name" @input="handleInput" class="form-control" id="inputName"
            placeholder="name@example.com" :required="!id" />
          <label for="inputName">Defina nombre de la dependencia</label>
        </div>
        <div class="form-floating">
          <textarea class="form-control" @input="handleInput" v-model="data.description"
            placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
          <label for="floatingTextarea2">Descripción de la dependencia</label>
        </div>
        <button type="submit" :class="id ? 'btn btn-warning' : 'btn btn-success'">{{ id ? 'Actualizar' : 'Guardar' }}
          <i :class="id ? 'bi bi-pencil-square' : 'bi bi-save'"></i></button>
      </form>
    </div>
  </div>
</template>
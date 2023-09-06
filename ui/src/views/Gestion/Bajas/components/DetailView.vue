<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {DetalleBaja} from "../services/bajas.interfaces";
import {anularBaja, obtenerBaja} from "../services/bajas.services";
import {useRouter} from "vue-router";
import Swal from "sweetalert2";

const url = useRouter()
const data = ref([] as DetalleBaja[])

onMounted(async () => {
  data.value = (await obtenerBaja(url.currentRoute.value.params.id)).data
})

const proceed = async()=>{
  await anularBaja(url.currentRoute.value.params.id)
  .then((Response)=>{
    Swal.fire({
      icon: 'success',
      title: 'Baja anulada',
      text: 'La baja ha sido anulada con éxito',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        url.push({name: 'bajas-list'})
      }
    })
    })
  }

const anular = () => {
  Swal.fire({
    icon:'question',
    title: '¿Está seguro?',
    text: '¿Desea anular la baja?',
    showCancelButton: true,
    confirmButtonText: 'Si, anular',
    cancelButtonText: 'No, cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result) => {
    if (result.isConfirmed) {
      proceed()
    }
  })
}
</script>

<template>
  <h4 class="card-title">Detalle de baja con PID {{ url.currentRoute.value.params.id }} <button type="button" class="btn btn-danger" @click="anular">Anular baja <i class="bi bi-trash"></i></button> </h4>
  <div class="card-text">
    <p>Estos son los elementos relacionados en la baja</p>
    <div v-for="item in data">
      <div v-for="index in item.elemento">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Elemento de placa: {{ index.placa }}</h4>
            <p class="card-text">
              {{ index.referencia }} - {{ index.modelo }}
              <p class="text-muted">Será eliminado el {{ item.fechaBorrado }}</p>
            </p>
          </div>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>
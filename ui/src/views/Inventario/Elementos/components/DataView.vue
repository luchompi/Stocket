<script setup lang="ts">
import type {Element} from '../services/elementos.interfaces'

const props = defineProps<{
  element: Element
}>()

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title"> Placa: {{ props.element.placa }} - {{ props.element.referencia }} {{
          props.element.modelo
        }}
      </h5>
      <div class="card-text">
        <div class="row">
          <div class="col">
            <p>Serial: {{ props.element.serial }}</p>
            <p>MAC: {{ props.element.MAC ? props.element.MAC : 'No hay datos sobre la MAC del elemento' }}</p>
          </div>
          <div class="col">
            <p>IP: {{ props.element.IP ? props.element.IP : 'No hay datos sobre la IP del elemento' }}</p>
            <p>Estado: {{ props.element.estado }}</p>
          </div>
          <div class="col">
            <p>Proveedor: {{ props.element.proveedor }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
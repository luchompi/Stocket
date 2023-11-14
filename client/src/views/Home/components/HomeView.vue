<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import Icon from '@/assets/Icons/Icon.json'
document.title = 'Home - Stocket'

</script>

<template>
  <div class="card-header">
    <h6>Home - Stocket</h6>
  </div>
  <div class="card-body">
    <div class="row">
      <Animations :animation-data="Icon" :style="null" />
      <div class="col">
        <div class="card-title">
          <h5>Bienvendio a Stocket</h5>
        </div>
        <p>Su sistema de inventario</p>
      </div>
    </div>
  </div>
</template>

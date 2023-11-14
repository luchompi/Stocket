<template>
    <div class="row">
        <Animations :animation-data="COMMS" :style="{ width: '100px', height: '100px' }" />
        <div class="col">
            <h5>Espere ...</h5>
            <p>Estamos procesando su petición, por favor espere...</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import Animations from './Animations.vue';
import COMMS from '../assets/Icons/COMMS.json';
</script>
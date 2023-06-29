<template>
    <div class="row justify-content-md-center">
        <div class="col col-lg-6">
            <div class="card">
                <div class="card-body">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue';
import { redirectToHome } from '@/hooks/sesion.hook'
watchEffect(()=>{
    redirectToHome()
})
</script>
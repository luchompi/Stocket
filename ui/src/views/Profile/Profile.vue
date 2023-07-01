<template>
    <div class="row justify-content-md-center">
        <div class="col col-lg-6">
            <div class="card">
                <div class="card-header">Perfil de usuario</div>
                <div class="card-body">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { loginRequired } from '@/hooks/sesion.hook';
onMounted(() => {
    loginRequired()
})
</script>
<template>
    <div class="card-header">
        <h6>Detalles de empresa {{ store.empresaData.name }}</h6>
    </div>
    <div class="card-body">
        <div class="card">
            <div class="card-body">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RedirectIfNotAuth } from '@/middleware/auth.middleware';
import useEmpresaStore from '@/stores/empresa.store';
const store = useEmpresaStore()


RedirectIfNotAuth();
</script>
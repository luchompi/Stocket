<script setup lang="ts">
import Animations from '@/components/Animations.vue';
import useSesionStore from '@/stores/sesion.store';
import Avatar from '@/assets/Icons/Avatar.json'
const sesion = useSesionStore();
document.title  = 'Perfil de usuario - Stocket';
</script>

<template>
    <div class="card-header">
        <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-0">
                <h6>Perfil de usuario</h6>
            </div>
            <RouterLink :to="{ name: 'ProfileUpdate' }" class="btn btn-warning ml-auto">Editar <i
                    class="bi bi-pencil-square"></i>
            </RouterLink>
        </div>
    </div>
    <div class="card-body">
        <div class="card-title">
            <h4>Bienvenido, {{ sesion.userData.username }}</h4>
            <div class="row">
                <Animations :animation-data="Avatar" :style="{ width: '100px', height: '100px' }" />
                <div class="col">
                    <p>Nombre: {{ sesion.userData.first_name && sesion.userData.last_name ? sesion.userData.first_name + ' '
                        + sesion.userData.last_name : 'N/A' }}</p>
                    <p>Correo electrónico: {{ sesion.userData.email ? sesion.userData.email : 'N/A' }}</p>
                    <p>Dirección: {{ sesion.userData.address || 'N/A' }}</p>
                    <p>Teléfono: {{ sesion.userData.phone || 'N/A' }}</p>
                    <p>Ciudad: {{ sesion.userData.city || 'N/A' }}</p>
                    <p>Perfil: {{ sesion.userData.groups[0] || sesion.userData.is_superuser ? 'SuperUsuario' : 'N/A' ||
                        'N/A'
                    }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

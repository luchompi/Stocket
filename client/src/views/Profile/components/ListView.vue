<template>
    <h5 class="card-text">
        
        <div class=" d-flex align-items-center">
                      <div class="text-center flex-grow-1 mb-0">Datos de usuario</div>
                      <RouterLink :to="{name:'profile-update'}" class="btn btn-warning ml-auto" >Editar <i
                              class="bi bi-pencil-square"></i>
                      </RouterLink>
                  </div>
    </h5>
    <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="!checkFullData()">
        <strong>¡Advertencia!</strong> Los datos de usuario se encuentran incompletos, verifiquelos y actualicelos.
    </div>
    
        <div class="mx-auto">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://placehold.co/200x200" alt="Imagen de usuario" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">Bienvenido, {{ sesion.UserData[0]?.first_name + ' ' +
                            sesion.UserData[0]?.last_name }}</h3>
                        <h5 class="card-title">Usuario: {{ sesion.UserData[0]?.username }}</h5>
                        <p class="card-text">ID: {{ sesion.UserData[0]?.uid ? sesion.UserData[0]?.uid : 'N/A' }}</p>
                        <p class="card-text">Dirección: {{ sesion.UserData[0]?.address && sesion.UserData[0]?.city ?
                            sesion.UserData[0]?.address + ' ' + sesion.UserData[0]?.city : 'N/A' }}</p>
                        <p class="card-text">Teléfono: {{ sesion.UserData[0]?.phone ? sesion.UserData[0]?.phone : 'N/A' }}
                        </p>
                        <p class="card-text">Correo: {{ sesion.UserData[0]?.email }}</p>
                    </div>
                </div>
            </div>
            
           
        </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue'
import { sesionStore } from "@/stores/sesion.store";
import { checkFullData } from '../services/profile.middlewares'
const sesion = sesionStore()

</script>
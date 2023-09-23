<template>
    <h5 class="card-title">
        <div class=" d-flex align-items-center">
            <div class="text-center flex-grow-1 mb-0">Actualizar datos de usuario</div>
            <RouterLink :to="{ name: 'profile' }" class="btn btn-secondary ml-auto">Atrás <i class="bi bi-arrow-left"></i>
            </RouterLink>
        </div>
    </h5>
    <form @submit.prevent="updateUserData">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputUid"><i class="bi bi-hash"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Ingrese su identificacion"
                aria-label="Username"
                aria-describedby="inputUid"
                v-model="uid"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputFirstName"><i class="bi bi-person-vcard"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Ingrese su nombre"
                aria-label="Username"
                aria-describedby="inputFirstName"
                v-model="first_name"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputLastName"><i class="bi bi-person-vcard"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Ingrese su apellido"
                aria-label="Username"
                aria-describedby="inputLastName"
                v-model="last_name"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputEmail"><i class="bi bi-envelope-at"></i></span>
              <input
                type="email"
                class="form-control"
                placeholder="Ingrese su correo electronico"
                aria-label="Username"
                aria-describedby="inputEmail"
                v-model="email"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputAddress"><i class="bi bi-geo"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Ingrese su direccion"
                aria-label="Username"
                aria-describedby="inputAddress"
                v-model="address"
              />
            </div>
            <div class="input-group mb-3">
                  <span class="input-group-text" id="inputPhone"><i class="bi bi-phone"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ingrese su número de contacto"
                    aria-label="Username"
                    aria-describedby="inputPhone"
                    v-model="phone"
                  />
                </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputCity"><i class="bi bi-building"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Indique la ciudad donde recide"
                aria-label="Username"
                aria-describedby="inputCity"
                v-model="city"
              />
            </div>
            <button type="submit" class="btn btn-warning" :disabled="isDisabled">Actualizar Datos</button>
        </form>
</template>

<script setup lang="ts">
import { ref,watchEffect } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { sesionStore } from '@/stores/sesion.store';
import { loginRequired } from '@/hooks/sesion.hook';
import {checkForm} from '../services/profile.middlewares'
import {updateUserData as makeUpdate} from '../services/profile.apis'
import { getUserData } from '../services/profile.apis';
const first_name = ref<string>('');
const last_name = ref<string>('');
const email = ref<string>('');
const address = ref<string>('');
const city = ref<string>('');
const uid = ref<number>(0);
const phone = ref<string>('');
const isDisabled = ref<boolean>(true);
const sesion = sesionStore();
const url = useRouter()

watchEffect(() => {
    loginRequired()
    isDisabled.value = checkForm({first_name,last_name,email,address,city,uid,phone})
})

const fetch = async () => {
    const data = {
        username: sesion.UserData[0]?.username,
        ...(first_name.value ? { first_name: first_name.value } : { first_name: sesion.UserData[0].first_name }),
        ...(last_name.value ? { last_name: last_name.value } : { last_name: sesion.UserData[0].last_name }),
        ...(email.value ? { email: email.value } : { email: sesion.UserData[0].email }),
        ...(address.value ? { address: address.value } : { address: sesion.UserData[0].address }),
        ...(city.value ? { city: city.value } : { city: sesion.UserData[0].city }),
        ...(uid.value && uid.value != 0 ? { uid: uid.value } : { uid: sesion.UserData[0].uid }),
        ...(phone.value ? { phone: phone.value } : { phone: sesion.UserData[0].phone })
    }
    await makeUpdate(data)
    .then((response) => {
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Datos actualizados correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            getUserData()
            url.push({name:'profile'})
        }
    })
}

const updateUserData = () => {
    Swal.fire({
        icon: 'question',
        title: '¿Esta seguro de actualizar sus datos?',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
    }).then((result) => {
        if (result.isConfirmed) {
            fetch();
        }
    })
}


</script>
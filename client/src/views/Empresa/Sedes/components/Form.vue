<template>
    <form @submit="handleSubmit">
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="inputNIT" placeholder="name@example.com" :required="!sedeId"
                        v-model="data.name" @input="handleInput" />
                    <label for="inputNIT">Nombre de la sede</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="inputAddress" placeholder="direccion de la sede"
                        :required="!sedeId" v-model="data.address" @input="handleInput" />
                    <label for="inputAddress">Dirección</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="inputNIT" placeholder="telefono de la sede"
                        :required="!sedeId" v-model="data.phone" @input="handleInput" />
                    <label for="inputNIT">Teléfono de contacto</label>
                </div>
            </div>
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="inputMail" placeholder="correo de la sede"
                        :required="!sedeId" v-model="data.email" @input="handleInput" />
                    <label for="inputMail">Correo Electrónico</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="inputWeb" placeholder="sitio web de la sede"
                        v-model="data.web" @input="handleInput" />
                    <label for="inputWeb">Sitio web</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-floating">
                <textarea :v-model="data.description" @input="handleInput" class="form-control"
                    placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
                <label for="floatingTextarea2">Descripción</label>
            </div>
        </div>
        <br />
        <button type="submit" :class="sedeId ? 'btn btn-warning' : 'btn btn-success'">
            {{ sedeId ? 'Actualizar' : 'Crear' }} <i :class="sedeId ? 'bi bi-pencil-square' : 'bi bi-save'"></i>
        </button>
    </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Sede } from '../services/sedes.interfaces';
import useSedeStore from '@/stores/sedes.store';
import { useRouter } from 'vue-router';
const url = useRouter()
const store = useSedeStore()
const data = ref({} as Sede)
let sedeId = url.currentRoute.value.params.id

if (sedeId) {
    const id = Array.isArray(sedeId) ? sedeId[0] : sedeId;
    const sede = store.sedes.find((item) => item.id === parseInt(id))
    data.value = sede as Sede
}
const handleInput = (e: any) => {
    data.value = { ...data.value, [e.target.name]: e.target.value }
}

const handleSubmit = (e: any) => {
    e.preventDefault()
    sedeId ? store.modificarSede(data.value, sedeId) : store.crearSede(data.value)
}
</script>
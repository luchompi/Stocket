<script setup lang="ts">
import {ref, watchEffect} from 'vue'
import type {Element} from '../services/elementos.interfaces';
import {getCategoriesByName} from '../../Categorias/services/categoria.services';
import type {Category} from '../../Categorias/services/categoria.interfaces';
import type {References} from '../../Referencias/services/services/referencias.interfaces';
import {filterReferences} from '../../Referencias/services/services/referencias.services';
import type {Suppliers} from '@/views/Personas/Proveedores/services/proveedor.interfaces';
import {getProveedoresByNameOrNIT} from '@/views/Personas/Proveedores/services/proveedor.services';
import type { Brands } from '../../Marcas/services/marca.interfaces';

const props = defineProps<{
  element?: Element
}>()

const emits = defineEmits(['onSaveData', 'onUpdateData'])

const saveData = () => {
  const data = {
    ...(props.element ? (referencia.value ? ({referencia: referencia.value?.id}) : ({referencia: props.element.referencia})) : ({referencia: referencia.value?.id})),
    ...(props.element ? (modelo.value ? ({modelo: modelo.value}) : ({modelo: props.element.modelo})) : ({modelo: modelo.value})),
    ...(props.element ? (serial.value ? ({serial: serial.value}) : ({serial: props.element.serial})) : ({serial: serial.value})),
    ...(props.element ? (IP.value ? ({IP: IP.value}) : ({IP: props.element.IP})) : ({IP: IP.value})),
    ...(props.element ? (MAC.value ? ({MAC: MAC.value}) : ({MAC: props.element.MAC})) : ({MAC: MAC.value})),
    ...(props.element ? (proveedor.value ? ({proveedor: proveedor.value?.NIT}) : ({proveedor: props.element.proveedor})) : ({proveedor: proveedor.value?.NIT})),
  }
  props.element ? emits('onUpdateData', data) : emits('onSaveData', data)
}

const marca = ref<string>('')
const categoria = ref<string>('')
const referencia = ref({} as References | null)
const IP = ref<string | null>(null)
const MAC = ref<string | null>('')
const serial = ref<string>('')
const modelo = ref<string>('')
const categoryResponse = ref([] as Category[])
const choosedCategory = ref({} as Category)
const ReferenceResponse = ref([] as References[])
const choosedBrand = ref({} as Brands)
const searchProvider = ref<string>('')
const proveedor = ref({} as Suppliers | null)
const proveedorResponse = ref([] as Suppliers[])
const dataSelected = ref<boolean>(false)
const findCategory = async () => {
  categoryResponse.value = (await getCategoriesByName(categoria.value)).data
}

const setCategory = (item: any) => {
  choosedCategory.value = item
}

const resetearSeleccion = () => {
  choosedCategory.value = {} as Category
  choosedBrand.value = {} as Brands
  referencia.value = null
  dataSelected.value = false
  ReferenceResponse.value = []
  categoryResponse.value = []
  marca.value = ''
  categoria.value = ''
}

const findBrand = async () => {
  const response = await filterReferences(choosedCategory.value.name, marca.value)
  if (response.status != 200) {
    referencia.value = null
  } else {
    ReferenceResponse.value = response.data
  }
}

const setReference = (item: any) => {
  choosedBrand.value = item
  referencia.value = item
  dataSelected.value = true
}

const findProvider = async () => {
  proveedorResponse.value = (await getProveedoresByNameOrNIT(searchProvider.value)).data
}

const setProveedor = (item: any) => {
  proveedor.value = item
}

watchEffect(() => {
  if (categoria.value.length > 3) {
    findCategory()
  }
  if (marca.value.length >= 2) {
    findBrand()
  }

  if (searchProvider.value.length >= 3) {
    findProvider()
  }
})

</script>
<template>
  <form @submit.prevent="saveData">
    <!--Referencia de elemento-->
    <div class="row">
      <!---Categoría-->
      <div class="col col-lg-6">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputBrand"><i class="bi bi-bookmark"></i></span>
          <input type="text" class="form-control" placeholder="Indique categoria del elemento"
                 v-model="categoria"/>
        </div>
        <!--Respuesta de búsqueda-->
        <ul class="list-group">
          <li class="list-group-item" v-for="element in categoryResponse" @click="setCategory(element)">{{
              element.name
            }}
            <i class="bi bi-check-circle-fill" v-if="element == choosedCategory"> Seleccionado</i>
          </li>
        </ul>
        <br>
      </div>
      <div class="col col-lg-6">
        <!----Marca de elemento-->
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputBrand"><i class="bi bi-file-earmark-post"></i></span>
          <input type="text" class="form-control" placeholder="Indique marca del elemento" v-model="marca"/>
        </div>
        <!--Respuesta de búsqueda-->
        <ul class="list-group">
          <li class="list-group-item" v-for="element in ReferenceResponse" @click="setReference(element)">{{
              element.marca
            }}
            <i class="bi bi-check-circle-fill" v-if="choosedBrand.name = element.marca.marca_name"> Seleccionado</i>

          </li>
        </ul>
        <br>
      </div>
      <br>
      <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="dataSelected">
        <strong>{{ choosedCategory.name }} - {{ referencia?.marca }}</strong> establecida con éxito.
        <button type="button" class="btn btn-danger" @click="resetearSeleccion">Borrar</button>
      </div>
      <br>
    </div>
    <!--modelo-->
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputmodelo"><i class="bi bi-cpu"></i></span>
      <input type="text" class="form-control" placeholder="Especifique el modelo de elemento" v-model="modelo"
             :required="!!(!props.element)"/>
    </div>
    <!--serial-->
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputserial"><i class="bi bi-upc"></i></span>
      <input type="text" class="form-control" placeholder="Especifique el serial de elemento" v-model="serial"
             :required="!!(!props.element)"/>
    </div>
    <!--IP-->
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputIP"><i class="bi bi-laptop"></i></span>
      <input type="text" class="form-control" placeholder="Especifique la IP de elemento" v-model="IP"/>
    </div>
    <!--MAC-->
    <div class="input-group mb-3">
      <span class="input-group-text" id="inputMAC"><i class="bi bi-laptop"></i></span>
      <input type="text" class="form-control" placeholder="Especifique la MAC de elemento" v-model="MAC"/>
    </div>
    <!--Proveedor-->
    <div class="row">
      <!---Categoría-->
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputBrand"><i class="bi bi-bookmark"></i></span>
          <input type="text" class="form-control" placeholder="Indique proveedor del elemento"
                 v-model="searchProvider" :required="!!(!props.element)"/>
        </div>
        <!--Respuesta de búsqueda-->
        <ul class="list-group">
          <li class="list-group-item" v-for="element in proveedorResponse" @click="setProveedor(element)">{{
              element.NIT
            }} -{{
              element.razonSocial
            }}
            <i class="bi bi-check-circle-fill" v-if="element == proveedor"> Seleccionado</i>

          </li>
        </ul>
        <div class="alert alert-primary alert-dismissible fade show" role="alert" v-if="proveedor?.razonSocial">
          <strong>{{ proveedor?.razonSocial }}</strong> selecionado.
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Guardar <i class="bi bi-save"></i></button>
  </form>
</template>


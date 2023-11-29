<template>
  {{ store.data }}
</template>
<script setup lang="ts">
import useSedeDependenciaStore from '@/stores/SedeDependencia.store';
import { useRouter } from 'vue-router';
import { onMounted } from "vue";

const url = useRouter()
const store = useSedeDependenciaStore()
const id = url.currentRoute.value.params.id

store.getData(id)

</script>
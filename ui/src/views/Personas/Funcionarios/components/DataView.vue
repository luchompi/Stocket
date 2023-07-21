<template>
    <div v-for="elements in props.data" :key="elements.iden">
        <div class="card">          
          <div class="card-body">
            <h5 class="card-title">{{ elements.iden }} - {{ elements.first_name }} {{ elements.last_name }}</h5>
            <div class="card-text">
                <div>Estado: {{ elements.status }}</div>
                
            </div>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
    </div>
    <br>
</template>
<script setup lang="ts">
import type { Employee } from '../services/funcionarios.interfaces';

const props = defineProps<{
    data: Array<Employee>
}>()

</script>
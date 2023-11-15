<script setup lang="ts">
import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
const props = defineProps<{
    animationData: object,
    style: object | null
}>()
let anim = ref()

onMounted(() => {
    setTimeout(() => {
        anim.value
    }, 5000)
})
</script>
<template>
    <div :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }" class="col col-lg-3">
        <LottieAnimation :animation-data="props.animationData" :auto-play="true" :loop="true" :speed="1" ref="anim"
            :style="props.style" />
    </div>
</template>
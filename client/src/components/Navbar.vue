<template>
    <nav class="py-2 bg-body-tertiary border-bottom">
        <div class="container d-flex flex-wrap">
            <ul class="nav me-auto">
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 active"
                        aria-current="page">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Features</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Pricing</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">FAQs</a></li>
                <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">About</a></li>
            </ul>
            <ul class="nav">
                <li class="nav-item">
                    <RouterLink :to="{ name: 'Login' }" class="nav-link link-body-emphasis px-2">Login</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{ name: 'Register' }" class="nav-link link-body-emphasis px-2">Sign up</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
    <header class="py-3 mb-4 border-bottom">
        <div class="container d-flex flex-wrap justify-content-center">
            <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
                <div :style="{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }">
                    <h3>Stocket</h3>
                </div>
            </a>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="input1"><i class="bi bi-watch"></i></span>
                    <input type="text" class="form-control" readonly :value="props.dateTime" />
                </div>
            </form>
        </div>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{
    dateTime: string
}>()
</script>
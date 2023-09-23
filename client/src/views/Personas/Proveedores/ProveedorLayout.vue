<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <div class=" d-flex align-items-center">
                    <div class="text-center flex-grow-1 mb-0">Funcionarios <i class="bi bi-person-circle"></i></div>
                    <div class="btn-group ml-auto" role="group" aria-label="Basic example">
                        <RouterLink :to="{ name: 'proveedores' }" class="btn btn-primary">Listado <i
                                class="bi bi-person-lines-fill"></i></RouterLink>
                        <RouterLink :to="{ name: 'proveedores-create' }" class="btn btn-success">Nuevo <i
                                class="bi bi-person-plus"></i>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="card-text">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
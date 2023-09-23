<template>
    <div class="row justify-content-md-center">
        <div class="col col-lg-10">
            <div class="card">
              <div class="card-header">
                <div class=" d-flex align-items-center">
                    <div class="text-center flex-grow-1 mb-0">Marcas <i class="bi bi-person-circle"></i></div>
                    <div class="btn-group ml-auto" role="group" aria-label="Basic example">
                        <RouterLink :to="{ name: 'marcas' }" class="btn btn-primary">Listado <i
                                class="bi bi-person-lines-fill"></i></RouterLink>
                        <RouterLink :to="{ name: 'marcas-nuevo' }" class="btn btn-success">Nuevo <i
                                class="bi bi-plus-square"></i>
                        </RouterLink>
                    </div>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">Gestión de marcas</h5>
                <router-view/>
              </div>
            </div>
        </div>
    </div>
</template>
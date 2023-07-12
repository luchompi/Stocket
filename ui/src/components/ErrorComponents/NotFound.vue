<template>
    <div class="row justify-content-md-center">
        <div class="col col-lg-6">
            <div class="card">
                <div class="card-header">¡Not Found!</div>
                <div class="card-body">
                    <!--- Loaders -->
                    <h5>
                        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </h5>
                    <h2>
                        404 - Not Found
                    </h2>
                    <h5 class="card-title">
                        Beep boop ... ¿Boop beep?
                    </h5>
                    <p class="card-text">No se ha encontrado el recurso al que usted intenta acceder, Compruebe la URL e intente otra vez</p>
                    <RouterLink :to="{name:'home'}" class="btn btn-primary">Sácame de aquí</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>


import useSesionStore from "@/stores/sesion.store";

export const RefreshSesion = () =>{
    const store = useSesionStore()
    store.isAuth? (
    store.timer < 1800 && store.timer > 1500 ? (
        store.refrescarSesion()
    ): (store.timer > 1800 ? store.cerrarSesion() : null) ) :null
}
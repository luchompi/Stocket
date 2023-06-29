import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const sesionStore = defineStore('sesion', () => {
  const PAT = ref<string|null>(null)
  const RAT = ref<string|null>(null)
  const UserData = ref<any|null>([])
  
  const isLogged = computed(() => PAT.value !== '' && RAT.value !== ''
  && PAT.value !== null && RAT.value !== null
  && PAT.value.length > 200 && RAT.value.length > 200
  )
  
  const setTokens = (data:any) =>{
    PAT.value = data.access
    RAT.value = data.refresh
  }

  const setUserData = (data:any) =>{
    isLogged.value ? (UserData.value ? UserData.value[0] = data : UserData.value = data) : UserData.value = null
  }

  const clearSesion = () =>{
    Swal.fire({
      title: 'Sesión cerrada',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    PAT.value = null
    RAT.value = null
    UserData.value = null
  }

  return {
    PAT,
    RAT,
    UserData,
    isLogged,
    setTokens,
    setUserData,
    clearSesion
  }
})

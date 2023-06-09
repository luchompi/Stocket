import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import {refreshTokens} from '@/views/Auth/services/auth.apis'

export const sesionStore = defineStore('sesion', () => {
  const PAT = ref<string|null>(null)
  const RAT = ref<string|null>(null)
  const UserData = ref<any|null>([])
  const timer = ref<number>(0)
  
  const isLogged = computed(() => PAT.value !== '' && RAT.value !== ''
  && PAT.value !== null && RAT.value !== null
  && PAT.value.length > 200 && RAT.value.length > 200
  )
  
  const setTokens = (data:any) =>{
    if(isLogged.value){
      PAT.value = data.access
      timer.value = 0
    }
    else{
      PAT.value = data.access
      RAT.value = data.refresh
    }
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
    timer.value = 0
  }

  const incrementTimer = () =>{
    if(isLogged.value){
      timer.value++
    }
  }

  const refreshAccessToken = () =>{
    if(timer.value > 1700 && timer.value < 1800 && isLogged.value){
      refreshTokens()
    }
  }

  return {
    PAT,
    RAT,
    UserData,
    isLogged,
    timer,
    setTokens,
    setUserData,
    clearSesion,
    incrementTimer,
    refreshAccessToken
  }
})

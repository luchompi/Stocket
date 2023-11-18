
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const { success, error } = toast

export const toastSuccess = () => {
    success('Se ha reestablecido conexión con el servidor', {
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        position: 'bottom-right',
        icon: '👏',
    })
}

export const toastError = () => {
    success('No se ha podido reestablecer comunicación con el servidor', {
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        position: 'bottom-right',
        icon: '🚧',
    })
}


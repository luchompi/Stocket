import Swal from 'sweetalert2'

export const successMessage = (title, message) => {
    return Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 3500,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        timerProgressBar: true
    })
}

export const errorMessage = (data) => {
    const errorArray = data;
    let errorMessage = ''
    try {
        for (const field in errorArray) {
            if (errorArray.hasOwnProperty(field)) {
                errorMessage += `${field}: ${errorArray[field].join(', ')}\n`;
            }
        }
    } catch (error) {
        errorMessage = errorArray.detail
    }
    return Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 3500,
        timerProgressBar: true
    })
}

export const warningMessage = (title, message) => {
    return Swal.fire({
        icon: 'warning',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: 3500,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        timerProgressBar: true
    })
}
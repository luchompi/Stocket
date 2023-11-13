import baseApi from '@/apis/base.api';
import type { Login, Register } from './auth.interfaces';

export const login = (data: Login) => {
    return baseApi.post('jwt/create', data)
}

export const registro = (data: Register) => {
    return baseApi.post('users/', data)
}
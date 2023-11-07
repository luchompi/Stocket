import { create } from 'zustand'

const useSesionStore = create((set) => ({
    PAT: null,
    RAT: null,
    isAuth: false,
    userData: null,
    empresaData: null,
    counter: 0,
    setTokens: (data) => {
        set({
            PAT: data.access,
            RAT: data.refresh,
            isAuth: true,
        });
    },
    setAccessToken: (data) => {
        set({
            PAT: data.access,
        });
    },
    setEmpresaData: (data) => {
        set({
            empresaData: data,
        });
    },
    incrementTimer: () => {
        set(state => ({ counter: state.counter + 1 }))
    },
    resetTimer: () => {
        set({ counter: 0 })
    },
    setUserData: (data) => {
        set({
            userData: data,
        });
    },
    logout: () => {
        set({
            PAT: null,
            RAT: null,
            isAuth: false,
            userData: null,
            counter: 0,
            empresaData: null,
        })
    }
}))

export default useSesionStore
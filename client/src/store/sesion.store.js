import { create } from 'zustand'

const useSesionStore = create((set) => ({
    PAT: null,
    RAT: null,
    isAuth: false,
    userData: null,
    setTokens: (data) => {
        set({
            PAT: data.access,
            RAT: data.refresh,
            isAuth: true,
        });
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
        })
    }
}))

export default useSesionStore
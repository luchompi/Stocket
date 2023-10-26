import {create} from 'zustand'

const useStore = create((set) => ({
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
    logout: () => {
        set({
            PAT: null,
            RAT: null,
            isAuth: false,
            userData: null,
        })
    }
}))

export default useStore
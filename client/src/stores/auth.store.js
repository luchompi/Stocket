import { create } from 'zustand'

const SesionStore = create((set) => ({
    PAT: null,
    RAT: null,
    userData: {},
    isLogged: false,
    setTokens: (data) => set({ PAT: data.access, RAT: data.refresh, isLogged: true }),
    setUserData: (data) => set({ userData: data }),
    destroySesion: () => set({ PAT: null, RAT: null, userData: {}, isLogged: false })
}))

export default SesionStore
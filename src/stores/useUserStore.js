import { create } from 'zustand'

export const useUserStore = create((set) => ({
  token: null,
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  setToken: (token) => set(() => ({ token: token })),
}))
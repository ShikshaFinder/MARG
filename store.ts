// import { Shikshacoin } from '@/components/shikshacoinpopup';
import {create} from 'zustand'



type Store = {
  id: string | null
  setId: (Id: string | null) => void
  Password: string | null 
  setPassword: (Password: string | null) => void
}
type User = {
  user: any | null
  setUser: (user: any | null) => void
}

export const useStore = create<Store>((set) => ({
  id: null,
  setId: (Id) => set(() => ({ id : Id })),
  Password: null,
  setPassword: (Password) => set(() => ({ Password : Password })),
}))

export const useUser = create<User>((set) => ({
  user: null,
  setUser: (user: string | null) => set(() => ({ user })),
}))

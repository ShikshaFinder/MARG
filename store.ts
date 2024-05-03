// import { Shikshacoin } from '@/components/shikshacoinpopup';
import {create} from 'zustand'



type Store = {
  selectedIcon: string | null
  setSelectedIcon: (iconName: string | null) => void
}
type User = {
  user: any | null
  setUser: (user: any | null) => void
}

export const useStore = create<Store>((set) => ({
  selectedIcon: null,
  setSelectedIcon: (iconName) => set(() => ({ selectedIcon: iconName })),
}))

export const useUser = create<User>((set) => ({
  user: null,
  setUser: (user: string | null) => set(() => ({ user })),
}))

//import Shikshacoin balance updating shiksha coin balance
// import { useStore } from "@/store";
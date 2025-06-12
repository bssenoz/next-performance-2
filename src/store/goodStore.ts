import { create } from 'zustand'

// İyi Performans Örneği Store
interface GoodStoreState {
  count: number
  text: string
  increment: () => void
  setText: (text: string) => void
}

const store = create<GoodStoreState>((set) => ({
  count: 0,
  text: '',
  increment: () => set((state) => ({ count: state.count + 1 })),
  setText: (text) => set({ text }),
}))

// Basit selector'lar
export const useCount = () => store((state) => state.count)
export const useText = () => store((state) => state.text)
export const useIncrement = () => store((state) => state.increment)
export const useSetText = () => store((state) => state.setText) 
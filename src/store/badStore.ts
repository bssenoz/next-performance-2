import { create } from 'zustand'

// Kötü Performans Örneği Store
// Bu store'da her state değişikliğinde tüm componentler yeniden render olacak
// çünkü selector kullanmıyoruz ve tüm state'i döndürüyoruz
export interface BadStoreState {
  count: number
  text: string
  increment: () => void
  setText: (text: string) => void
}

export const useBadStore = create<BadStoreState>((set) => ({
  count: 0,
  text: '',
  increment: () => set((state) => ({ 
    ...state,
    count: state.count + 1
  })),
  setText: (text) => set((state) => ({ 
    ...state,
    text
  }))
})) 
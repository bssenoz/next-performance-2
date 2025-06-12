import { shallow } from 'zustand/shallow'
import { useTodoStore } from '../store/todoStore'

export const useGoodTodos = () => {
  // Sadece gerekli state'leri seçme
  const todos = useTodoStore(state => state.todos, shallow)
  
  // Fonksiyonları ayrı ayrı seçme - gereksiz render'ları önler
  const addTodo = useTodoStore(state => state.addTodo)
  const toggleTodo = useTodoStore(state => state.toggleTodo)
  
  // İstatistikleri shallow comparison ile alma
  const stats = useTodoStore(
    state => {
      const stats = state.getTodoStats()
      return { active: stats.active, completed: stats.completed }
    },
    shallow
  )

  return {
    todos,
    addTodo,
    toggleTodo,
    stats,
  }
} 
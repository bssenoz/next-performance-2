import { useTodoStore } from '../store/todoStore'

export const useBadTodos = () => {
  // Tüm store'u direkt kullanma - kötü performans
  const store = useTodoStore()

  return {
    todos: store.todos,
    addTodo: store.addTodo,
    toggleTodo: store.toggleTodo,
    getTodoStats: store.getTodoStats,
  }
} 
import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

// State interfaces
interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoStore {
  // State
  todos: Todo[]
  
  // Actions
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  getTodoStats: () => { active: number; completed: number }
}

const todoStore = create<TodoStore>((set, get) => ({
  todos: [],
  
  addTodo: (text: string) => {
    set((state) => ({
      todos: [...state.todos, {
        id: Date.now(),
        text,
        completed: false
      }]
    }))
  },
  
  toggleTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }))
  },
  
  getTodoStats: () => {
    const { todos } = get()
    const completedCount = todos.filter(todo => todo.completed).length
    return {
      active: todos.length - completedCount,
      completed: completedCount
    }
  }
}))

export const useTodoStore = <T>(selector: (store: TodoStore) => T): T => {
  return useStoreWithEqualityFn(todoStore, selector, shallow)
} 
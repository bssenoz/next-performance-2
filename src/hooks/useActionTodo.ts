import { useState, useCallback } from 'react'
import { useTodoStore } from '../store/todoStoreWithActions'

/**
 * Todo istatistiklerini takip eden hook
 * Performance: Selector ile izole render
 */
export const useTodoStats = () => {
  return useTodoStore(state => state.getTodoStats())
}

/**
 * Todo durumunu değiştiren hook
 * Performance: Memoized toggle fonksiyonu
 */
export const useTodoToggle = () => {
  const toggleTodo = useTodoStore(state => state.toggleTodo)
  return useCallback((id: number) => toggleTodo(id), [toggleTodo])
}

/**
 * Todo ekleme formunu yöneten hook
 * Performance: Lokal state + memoized handlers
 */
export const useAddTodo = () => {
  const [text, setText] = useState('')
  const addTodo = useTodoStore(state => state.addTodo)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text)
      setText('')
    }
  }, [addTodo, text])

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  return {
    text,
    handleSubmit,
    handleTextChange
  }
}

/**
 * Todo listesini takip eden hook
 * Performance: Selector ile izole todos takibi
 */
export const useTodoList = () => {
  return useTodoStore(state => state.todos)
} 
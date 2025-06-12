import React, { memo } from 'react'
import { useTodoStats, useTodoToggle, useAddTodo, useTodoList } from '../../hooks/useActionTodo'

/**
 * Performance: memo + izole stats render
 */
const TodoStats = memo(() => {
  const { active, completed } = useTodoStats()

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded text-black">
      <p>Aktif Todolar: {active}</p>
      <p>Tamamlanan Todolar: {completed}</p>
    </div>
  )
})

/**
 * Performance: memo + memoized toggle
 */
const TodoItem = memo(({ id, text, completed }: { id: number, text: string, completed: boolean }) => {
  const toggleTodo = useTodoToggle()

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      <span className={completed ? 'line-through text-gray-500' : ''}>
        {text}
      </span>
    </div>
  )
})

/**
 * Performance: memo + izole form state
 */
const AddTodo = memo(() => {
  const { text, handleSubmit, handleTextChange } = useAddTodo()

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Yeni todo ekle..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ekle
        </button>
      </div>
    </form>
  )
})

/**
 * Performance: memo + izole todos render
 */
export const TodoListWithActions = memo(() => {
  const todos = useTodoList()

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List with State Actions</h1>
      <TodoStats />
      <AddTodo />
      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  )
}) 
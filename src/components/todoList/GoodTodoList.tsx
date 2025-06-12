import React, { memo } from 'react'
import { useGoodTodos } from '../../hooks/useGoodTodos'

// İstatistikler değiştiğinde render olur
const TodoStats = memo(() => {
  const { stats } = useGoodTodos()

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded text-black">
      <p>Aktif Todolar: {stats.active}</p>
      <p>Tamamlanan Todolar: {stats.completed}</p>
    </div>
  )
})

// Sadece ilgili todo değiştiğinde render olur
const TodoItem = memo(({ id, text, completed }: { id: number, text: string, completed: boolean }) => {
  const { toggleTodo } = useGoodTodos()

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

// Sadece form işlemlerinde render olur
const AddTodo = memo(() => {
  const { addTodo } = useGoodTodos()
  const [text, setText] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
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

// Ana komponent - todos değiştiğinde render olur
export const GoodTodoList = memo(() => {
  const { todos } = useGoodTodos()

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Zustand İyi Örnek List</h1>
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
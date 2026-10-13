'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/button'
import { useTodos } from '../hooks/useTodos'
import TodoItem from './TodoItem'

export default function TodoList() {
  const router = useRouter()
  const {
    todos,
    isPending,
    isError,
    isMutating,
    hasMutationError,
    handleToggle,
    handleDelete,
  } = useTodos()

  return (
    <>
      <Button
        className="mb-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        onClick={() => router.push('/add-task')}
      >
        Add Task
      </Button>

      {isPending && <p>Loading your tasks...</p>}
      {isError && <p role="alert">Could not load tasks.</p>}
      {hasMutationError && <p role="alert">Could not update the task. Please try again.</p>}
      {!isPending && !isError && (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              disabled={isMutating}
            />
          ))}
        </ul>
      )}
    </>
  )
}

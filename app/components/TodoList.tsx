'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTodo, getAllTodos, updateTodo } from '../lib/api'
import type { Todo } from '../types'
import { Button } from '../../components/ui/button'
import TodoItem from './TodoItem'

export default function TodoList() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: todos = [], isPending, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
  })

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: Todo['id']; completed: boolean }) =>
      updateTodo(id, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  function handleToggle(todo: Todo) {
    updateTodoMutation.mutate({ id: todo.id, completed: !todo.completed })
  }

  function handleDelete(id: Todo['id']) {
    deleteTodoMutation.mutate(id)
  }

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
      {!isPending && !isError && (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </>
  )
}

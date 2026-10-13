'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTodo, getAllTodos, updateTodo } from '../lib/api'
import type { Todo } from '../types'

export function useTodos() {
  const queryClient = useQueryClient()
  const todosQuery = useQuery({
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
// usually we don't put this function inside hook. you can do it while returning
  function handleToggle(todo: Todo) {
    updateTodoMutation.mutate({ id: todo.id, completed: !todo.completed })
  }

  function handleDelete(id: Todo['id']) {
    deleteTodoMutation.mutate(id)
  }

  return {
    todos: todosQuery.data ?? [],
    isPending: todosQuery.isPending,
    isError: todosQuery.isError,
    isMutating: updateTodoMutation.isPending || deleteTodoMutation.isPending,
    hasMutationError: updateTodoMutation.isError || deleteTodoMutation.isError,
    handleToggle,
    handleDelete,
  }
}

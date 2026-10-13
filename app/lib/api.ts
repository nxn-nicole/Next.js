import type { Todo } from '../types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}

export async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  if (!response.ok) {
    throw new Error('Failed to create todo')
  }

  return response.json()
}

export async function updateTodo(id: Todo['id'], completed: boolean): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  })

  if (!response.ok) {
    throw new Error('Failed to update todo')
  }

  return response.json()
}

export async function deleteTodo(id: Todo['id']): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete todo')
  }
}

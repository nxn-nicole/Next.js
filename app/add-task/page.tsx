'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../../components/ui/field'
import { Input } from '../../components/ui/input'
import { createTodo } from '../lib/api'
import { taskSchema, type TaskFormData } from './schema'

export default function AddTaskPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  })

  async function onSubmit(data: TaskFormData) {
    try {
      await createTodo({
        title: data.title,
        completed: false,
      })

      reset()
      router.push('/')
      router.refresh()
    } catch {
      setError('root', {
        message: 'Could not save the task. Please try again.',
      })
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <section className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-xl">
        <h1 className="mb-4 text-xl font-semibold text-gray-900">Add a task</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Task name</FieldLabel>
            <Input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-blue-600"
              id="title"
              placeholder="e.g. Read Next.js docs"
              autoFocus
              aria-invalid={!!errors.title}
              {...register('title')}
            />
            <FieldDescription>Keep it short and clear.</FieldDescription>
            <FieldError errors={[errors.title]} />
          </Field>
          <FieldError className="mb-4" errors={[errors.root]} />
          <div className="flex justify-end gap-3">
            <Link className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100" href="/">
              Cancel
            </Link>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

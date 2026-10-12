import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Task name is required')
    .max(50, 'Task name must be 50 characters or fewer'),
})

export type TaskFormData = z.infer<typeof taskSchema>

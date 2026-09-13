import { z } from 'zod';

export const todoCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['pending', 'completed']).default('pending'),
});

export const todoIdParamSchema = z.object({
  todoId: z.string().min(1, 'todoId is required'),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;
export type TodoIdParamInput = z.infer<typeof todoIdParamSchema>;

export default {
  todoCreateSchema,
  todoIdParamSchema,
};

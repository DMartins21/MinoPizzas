import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string({ message: 'Name precisa ser uma string' }).min(2, { message: 'Name precisa ter pelo menos 2 caracteres' }),
  description: z.string().optional(),
});
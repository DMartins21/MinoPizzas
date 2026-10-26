import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({ message: 'O nome precisa ser um texto!' })
        .min(3, { message: 'No minimo de 3 letras' }),
        email: z.email({ message: 'Precisa ser um email válido!' }),
        password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    })
});

export const authUser = z.object({
    body: z.object({
        email: z.email({ message: 'Email ou senha incorretos' }),
        password: z.string().min(6, { message: 'Email ou senha incorretos' })
    })
});
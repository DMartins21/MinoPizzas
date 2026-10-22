import { z } from 'zod';

exports.createUserSchema = z.object({
    body: z.object({
        name: z.string({ message: 'O nome precisa ser um texto!' })
        .min(3, { message: 'No minimo de 3 letras' }),
        email: z.email({ message: 'Precisa ser um email válido!' }),
        password: z.string().min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    })
});
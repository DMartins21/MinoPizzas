import { z } from 'zod';

export const createOrder = z.object({
    body: z.object({
            table: z.number({ message: 'O número da mesa é obrigatório' })
                    .int({ message: 'O número tem que ser um inteiro' })
                        .positive({ message: 'O número deve ser positivo' }),
            name: z.string().optional()                
    })
});
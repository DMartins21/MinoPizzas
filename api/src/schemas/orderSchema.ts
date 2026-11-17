import { z } from 'zod';

export const createOrder = z.object({
    body: z.object({
            table: z.number({ message: 'O número da mesa é obrigatório' })
                    .int({ message: 'O número tem que ser um inteiro' })
                        .positive({ message: 'O número deve ser positivo' }),
            name: z.string().optional()                
    })
});

export const addItemInOrder = z.object({
    body: z.object({
            order_id: z.string({ message: 'O número do Pedido é obrigatório' }),
            
            product_id: z.number({ message: 'O número do produto é obrigatório' })
            .int({ message: 'Deve ser um inteiro' })
            .positive({ message: 'Número deve ser positivo'}),
            
            amount: z.number({  })
            .int({ message: 'Amount deve ser um número inteiro' })
            .positive({ message: 'Amount deve ser um número positivo' })
    })
});
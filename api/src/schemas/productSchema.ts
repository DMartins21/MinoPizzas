import { z } from "zod";

export const createProductSchema = z.object({
    body: z.object({
    name: z.string({ message: 'O Nome do Produto é obrigátorio'})
    .min(2, 'O nome precisa ter pelo menos 2 caracteres'),
    price: z.string({ message: 'O Preço do Produto é obrigátorio'}).min(2, 'O Preço precisa ter pelo menos 2 caracteres'),
    description: z.string({ message: 'A Descrição do Produto é obrigátorio'}).min(2, 'A descrição precisa ter pelo menos 2 caracteres'),
    category_id: z.string({ message: 'A Categoria do Produto é obrigátoria'})
    })
})
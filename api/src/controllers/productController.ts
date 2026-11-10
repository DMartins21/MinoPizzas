import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { json } from 'zod';

class ProductController{
    async create(req: Request, res: Response) {
        const {name, price, description, category_id} = req.body;

        if(!req.file)
            throw new Error("Imagem Obrigatória");

        const service = await new ProductService();
        const newProduct = await service.newProduct({
            name: name,
            price: parseInt(price),
            description: description,
            category_id: category_id,
            imageBuffer: req.file.buffer,
            imageName: req.file.originalname
        });

        return res.status(201).json(newProduct);
    }
}

export { ProductController }
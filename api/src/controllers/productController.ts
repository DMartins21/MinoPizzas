import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

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

    async getProducts(req: Request, res: Response){
        const disable = req.query['disable'] as boolean | undefined;
        
        const service = new ProductService();
        const products = await service.getProducts({ disable: disable ?? false });

        if(products.length === 0)
            return res.sendStatus(204);

        return res.status(200).json(products);

    }

    async deleteProduct(req: Request, res: Response){
        const  { product_id } = req.query;
        const id = Number(product_id)

        const service = new ProductService();
        const deleted = await service.deleteProduct({ product_id: id })

        return res.status(200).json(deleted);
    }
}

export { ProductController }
import {CategoryService} from '../services/categoryService';
import { Request, Response } from 'express';

class CategoryController {

    async newCategory(req: Request, res: Response) {
        const { name } = req.body;
        
        const catService = new CategoryService();
        const category = await catService.createCategory({ name: name });
        
        res.status(201).json(category);
    }

    async getAllCategoires(req: Request, res: Response) {
        const catService = new CategoryService();
        const categories = await catService.getAllCategories();
        if(!categories || categories.length === 0)
            return res.status(204).json({ message: 'Nenhuma categoria cadastrada' });

        return res.status(200).json(categories);
    }

    async getCategoryProducts(req: Request, res: Response){
        const { category_id } = req.query;
        const id = Number(category_id)

        const service = new CategoryService();
        const categoryProds = await service.getCategoryProducts({ category_id: id })
        if(categoryProds.length === 0)
            return res.sendStatus(204);
        
        return res.status(200).json(categoryProds);
    }
}

export { CategoryController };
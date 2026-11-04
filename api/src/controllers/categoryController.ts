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
}

export { CategoryController };
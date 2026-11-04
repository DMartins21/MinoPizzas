import {CategoryService} from '../services/categoryService';
import { Request, Response } from 'express';

class CategoryController {

    async newCategory(req: Request, res: Response) {
        const { name } = req.body;
        
        const catService = new CategoryService();
        const category = await catService.createCategory({ name: name });
        
        res.status(201).json(category);
    }
}

export { CategoryController };
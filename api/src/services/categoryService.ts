import { db } from '../database/db';

interface CreateCategoryProps{
    name: string;
}

class CategoryService {
    async createCategory({ name }: CreateCategoryProps){
        const categoryExist = await db.orm.public.Category.where({
            name: name
        }).first();

        if(categoryExist)
        {
            throw new Error('Categoria já cadastrada');
        }

        const category = await db.orm.public.Category.create(
        {
            name: name
        }
        )

        return category;
    }
}

export { CategoryService };
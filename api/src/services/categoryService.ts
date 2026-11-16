import { db } from '../database/db';

interface CreateCategoryProps{
    name: string;
}

interface getCategoryProps{
    category_id: number
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
    async getAllCategories(){
        const categories = await db.orm.public.Category.all();
        return categories;
    }

    async getCategoryProducts({ category_id } : getCategoryProps){
        const products = await db.orm.public.Category.select("id", "name", "createdAt", "updatedAt")
        .include("products")
        .where({
            id: category_id
        }).all();
        
        return products
    }
    
}

export { CategoryService };
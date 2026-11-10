import { db } from "../database/db";
import cloudinary from "../config/cloudinary";
import { Readable } from "node:stream";

interface newProductProps{
    name: string,
    price: number,
    description: string,
    category_id: number,
    imageBuffer: Buffer,
    imageName: string,
}

class ProductService{
    async newProduct({ 
        name,
        price,
        description,
        category_id,
        imageBuffer, imageName
        }:newProductProps){
        
        const category_exist = await db.orm.public.Category
        .where({
            id: category_id
        }).first();

        if(!category_exist)
            throw new Error("Categoria não existe");

        let bannerUrl = "";    

        try{
	        const result = await new Promise<any>((resolve, reject) => {
		        const uploadStream = cloudinary.uploader.upload_stream({
			        folder: "products",
			        resourse_type: "image",
			        public_id: `${Date.now()}-${imageName.split(".")[0]}`
		        }, (error, result) => {
			        if(error) reject(error);
			        resolve(result);
		        })
		
		        const bufferStream = Readable.from(imageBuffer);
		        bufferStream.pipe(uploadStream);
            
	        })
	
	        bannerUrl = result.secure_url;
	
            }catch(error){
                throw new Error("Não foi possível enviar sua imagem")
            }

            const product = await db.orm.public.Product.create({
                name: name,
                price: price,
                description: description,
                category_id: category_id,
                banner: bannerUrl
            })
            
            const createdProduct = {
                name: product.name,
                price: product.price,
                description: product.description,
                banner: product.banner,
                category_id: product.category_id,
                createdAt: product.createdAt
            };

            return createdProduct;

    }
}

export { ProductService };
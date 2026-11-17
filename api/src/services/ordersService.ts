import { db } from "../database/db";

interface ListOrdersServiceProps{
    draft: string;
}

interface NewOrderProps{
    table: number,
    name?: string
}

interface AddItemsInOrderProps{
    order_id: string,
    product_id: number,
    amount: number
}

class OrdersService{
    async ListOrderService({ draft } : ListOrdersServiceProps){
        const order = await db.orm.public.Order
        .select("id", "table", "name", "draft", "status", "createdAt")
        .where({
            draft: draft === "true" ? true : false
        }).include('items', 
            (q) => q.select('id', 'amount')
        .include('product', 
            (p) => p.select('id', 'name', 'price', 'description', 'banner')))
        .all();
        
        return order;
    }

    async NewOrder({ table, name }: NewOrderProps){
        try{
            const newOrder = await db.orm.public.Order.create({
                table: table,
                name: name ?? ""
            });
            
            const order = {
                id: newOrder.id,
                table: newOrder.table,
                status: newOrder.status,
                draft: newOrder.draft,
                name: newOrder.name,
                createdAt: newOrder.createdAt
            };

            return order;
        }catch(err){
            throw new Error('Erro ao Criar Pedido')
        }
    }

    async AddItemsInOrder({ order_id, product_id, amount } : AddItemsInOrderProps){
        const orderExist = await db.orm.public.Order.where({
            id: order_id
        }).first();
        if(!orderExist)
            throw new Error('Pedido não Encontrado');

        const productExist = await db.orm.public.Product.where({
            id: product_id,
            disable: false
        }).first();
        if(!productExist)
            throw new Error('Produto não existe no catalogo');

        const item = await db.orm.public.Item
        .create({
            order_id : order_id,
            product_id: product_id,
            amount: amount
        });

        const data = await db.orm.public.Item
        .select('id', 'amount', 'order_id', 'product_id', 'createdAt')
        .include('product', 
            (p) => p.select('id', 'name', 'price', 'description', 'banner'))
        .first();

        return data;

    }
}

export { OrdersService }
import { db } from "../database/db";

interface ListOrdersServiceProps{
    draft: string;
}

interface NewOrderProps{
    table: Number,
    name?: string
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
}

export { OrdersService }
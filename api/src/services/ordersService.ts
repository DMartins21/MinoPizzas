import { db } from "../database/db";

interface ListOrdersServiceProps{
    draft: string;
}

interface SendOrderProps{
    name: string,
    order_id: string
}

interface FinishOrderProps{
    order_id: string
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

interface RemoveItemInOrderProps{
    item_id: string
}

interface OrderDetailProps {
    order_id: string
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

       async GetOrderById({ order_id } : OrderDetailProps) {
        try {
            const order = await db.orm.public.Order
                .select("id", "table", "name", "draft", "status", "createdAt", "updatedAt")
                .where({ id: order_id })
                .include('items', 
                    (q) => q.select('id', 'amount', 'createdAt')
                .include('product', 
                    (p) => p.select('id', 'name', 'price', 'description', 'banner')))
                .first();
            
            if (!order) {
                return null;
            }
            
            return order;
        } catch (error) {
            throw new Error("Erro interno do servidor ao buscar o pedido.");
        }
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


    async removeItemInOrder({ item_id } : RemoveItemInOrderProps){
        
        try{
        const itemExist = await db.orm.public.Item.where({
            id: item_id
        }).first();
        if(!itemExist)
            throw new Error('Item não existe!');
        await db.orm.public.Item.where({
            id: itemExist.id
        }).delete();
        return 'Item Removido com sucesso!';
        
    }catch(err){
            console.log(err)
            throw new Error('Erro ao remover item');
        }
    }

    async DeleteOrder({ order_id }: FinishOrderProps){
        try{
        if(!await db.orm.public.Order.where({
            id: order_id
        }).first()){
            throw new Error('Pedido não encontrado');
        }
        const order = await db.orm.public.Order.where({
            id: order_id
        }).delete();

        return 'Pedido Deletado!';
    }catch(err){
        throw new Error('Erro ao tentar deletar pedido');
    }
    }

    async SendOrder({ name ,order_id } : SendOrderProps){
        const orderExist = await db.orm.public.Order.where({
            id: order_id
        }).first();

        if(!orderExist)
            throw new Error('Pedido não registrado');

        const updateOrder = await db.orm.public.Order.where({
            id: order_id
        })
        .select('id', 'table', 'name', 'status', 'draft' ,'createdAt')
        .update({
            draft: false
        });
        
        return updateOrder;

    }

    async FinishOrder({ order_id }: FinishOrderProps){

        try{
        var order = await db.orm.public.Order.where({
            id: order_id
        }).first();

        if(!order)
            throw new Error('Pedido não registrado')

        const order_finish = await db.orm.public.Order.where({
            id: order_id
        })
        .select('id', 'table', 'name', 'status', 'updatedAt')
        .update({
            status: true
        });
        
        if(!order_finish)
            throw new Error('Falha ao Finalizar');

        return order_finish;
    }catch(err){
        console.log(err)
        throw new Error('Falha no Pedido')
    }
}

}

export { OrdersService }
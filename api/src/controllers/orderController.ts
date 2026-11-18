import { Response, Request } from "express";
import { OrdersService } from "../services/ordersService";

class OrderController{
    async ListOrders(req: Request, res: Response){
        const { draft } = req.query;

        const service = new OrdersService();
        const orders = await service.ListOrderService({ draft: draft })

        return res.status(200).json(orders)

    }

        async OrderDetails(req: Request, res: Response) {

        const { order_Id } = req.query;

        const service = new OrdersService();
        const orderDetails = await service.GetOrderById({ order_id : order_Id as string});

        if (!orderDetails) {
            return res.status(404).json({ message: `Pedido com ID ${order_Id} não encontrado.` });
        }

        return res.status(200).json(orderDetails);
    }

    async NewOrder(req: Request, res: Response){
        const {table, name} = req.body;
        
        const service = new OrdersService();
        const order = await service.NewOrder({ table, name });

        return res.status(201).json(order);
    }

    async AddItemsInOrder(req: Request, res: Response){
        const { order_id, product_id, amount } = req.body;

        const service = new OrdersService();
        const newItem = await service.AddItemsInOrder({ order_id, product_id, amount });

        return res.status(200).json(newItem);
    }

    async SendOrder(req: Request, res: Response){
        const { name, order_id } = req.body;

        const service = new OrdersService();
        const send = await service.SendOrder({ name: name, order_id: order_id });


        return res.status(200).json(send);

    }

    async FinishOrder(req: Request, res: Response) {

        const { order_id } = req.body;

        const service = new OrdersService();
        
        const finishOrder = await service.FinishOrder({ order_id });

        return res.status(200).json(finishOrder);
    }

    async DeleteOrder(req: Request, res: Response){
        const { order_id } = req.query;

        const service = new OrdersService();
        const deleteOrder = await service.DeleteOrder({ order_id : order_id as string });
        return res.status(204).json(deleteOrder);
    }

    async RemoveItemInOrder(req: Request, res: Response){
        const  { item_id } = req.query;
        
        const service = new OrdersService();
        const itemRemove = await service.removeItemInOrder({ item_id: item_id as string });

        return res.status(204).json(itemRemove);
    }
}

export { OrderController }
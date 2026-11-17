import { Response, Request } from "express";
import { OrdersService } from "../services/ordersService";

class OrderController{
    async ListOrders(req: Request, res: Response){
        const { draft } = req.query;

        const service = new OrdersService();
        const orders = await service.ListOrderService({ draft: draft })

        return res.status(200).json(orders)

    }

    async NewOrder(req: Request, res: Response){
        const {table, name} = req.body;
        
        const service = new OrdersService();
        const order = await service.NewOrder({ table, name });

        return res.status(201).json(order);
    }
}

export { OrderController }
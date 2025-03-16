import { Request, Response } from 'express';
import OrderRepository from '../../db/sequelize/repository/order.repository';
import CreateOrderUseCase from '@usecase/order/create/create.order.usecase';

export default class OrderController {
   private constructor() {}

   static async create(req: Request, res: Response): Promise<Response> {
      const orderRepository = new OrderRepository();
      const createOrderUseCase = new CreateOrderUseCase(orderRepository);

      const { body } = req;

      const inputCreateOrder = {
         customerId: body.customerId,
         products: (body.products as any[]).map(p => {
            return {
               id: p.id,
               name: p.name,
               quantity: p.quantity,
               price: p.price,
            };
         }),
      };

      const outputOrderCreated = await createOrderUseCase.execute(inputCreateOrder);
      return res.status(201).json(outputOrderCreated);
   }
}

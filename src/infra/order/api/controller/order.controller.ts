import { Request, Response } from 'express';
import OrderRepository from '../../db/sequelize/repository/order.repository';
import CreateOrderUseCase from '@usecase/order/create/create.order.usecase';
import FindOrderUseCase from '@usecase/order/find/find.order.usecase';
import UpdateOrderUseCase from '@usecase/order/update/update.order.usecase';
import ListOrderUseCase from '@usecase/order/list/list.order.usecase';

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

   static async find(req: Request, res: Response): Promise<Response> {
      const orderRepository = new OrderRepository();
      const findOrderUseCase = new FindOrderUseCase(orderRepository);

      const inputFindOrder = { id: req.params.id };

      const outputFoundOrder = await findOrderUseCase.execute(inputFindOrder);
      return res.status(200).json(outputFoundOrder);
   }

   static async update(req: Request, res: Response): Promise<Response> {
      const orderRepository = new OrderRepository();
      const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);

      const inputUpdateOrder = {
         id: req.params.id,
         items: (req.body.items as any[]).map(i => {
            return {
               id: i.id,
               productId: i.productId,
               productName: i.productName,
               quantity: i.quantity,
               price: i.price,
            };
         }),
      };

      const outputOrderCreated = await updateOrderUseCase.execute(inputUpdateOrder);
      return res.status(200).json(outputOrderCreated);
   }

   static async list(req: Request, res: Response): Promise<Response> {
      const orderRepository = new OrderRepository();
      const listOrderUseCase = new ListOrderUseCase(orderRepository);

      const outputOrderList = await listOrderUseCase.execute();
      return res.status(200).json({
         orders: outputOrderList,
      });
   }
}

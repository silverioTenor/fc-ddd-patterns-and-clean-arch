import IOrderRepository from '@domain/checkout/repository/order.interface';
import { InputUpdateOrderDto, OutputUpdateOrderDto } from './update.order.dto';
import OrderFactory from '@domain/checkout/factory/order-factory';
import Order from '@domain/checkout/entity/order';
import Mapper from '@util/mapper';

export default class UpdateOrderUseCase {
   constructor(private orderRepository: IOrderRepository) {}

   async execute(input: InputUpdateOrderDto): Promise<OutputUpdateOrderDto> {
      let foundOrder;

      foundOrder = await this.orderRepository.find(input.id);

      foundOrder = foundOrder as any;

      const factory = new OrderFactory();
      const order = factory.create({
         orderId: input.id,
         orderItemId: foundOrder.items.map((p: any) => p.id),
         customerId: foundOrder.customerId,
         products: input.items.map((p, i) => {
            return {
               orderItemId: foundOrder.items[i].id,
               id: p.productId,
               name: p.productName,
               quantity: p.quantity,
               price: p.price,
            };
         }),
      });

      await this.orderRepository.update(order);

      let outputOrderUpdated = Mapper.convertTo<Order, OutputUpdateOrderDto>(order);
      outputOrderUpdated.total = order.total();

      return outputOrderUpdated;
   }
}

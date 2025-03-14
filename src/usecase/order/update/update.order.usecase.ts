import IOrderRepository from '@domain/checkout/repository/order.interface';
import { InputUpdateOrderDto, OutputUpdateOrderDto } from './update.order.dto';
import OrderFactory from '@domain/checkout/factory/order-factory';
import Order from '@domain/checkout/entity/order';
import Mapper from '../../../util/mapper';

export default class UpdateOrderUseCase {
   constructor(private orderRepository: IOrderRepository) {}

   async execute(input: InputUpdateOrderDto): Promise<OutputUpdateOrderDto> {
      let foundOrder;

      try {
         foundOrder = await this.orderRepository.find(input.id);
      } catch (error) {
         throw new Error(`Error updating order: ${error}`);
      }

      foundOrder = foundOrder as any;

      const factory = new OrderFactory();
      const order = factory.create({
         orderId: input.id,
         orderItemId: foundOrder.items.map((p: any) => p.id),
         customerId: foundOrder.customerId,
         products: input.items.map(p => {
            return {
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

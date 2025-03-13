import IOrderRepository from '@domain/checkout/repository/order.interface';
import { InputUpdateOrderDto, OutputUpdateOrderDto } from './update.order.dto';
import OrderFactory from '@domain/checkout/factory/order-factory';
import Order from '@domain/checkout/entity/order';

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
         products: input.products,
      });

      await this.orderRepository.update(order);
      return this.mapOrderToDto(order);
   }

   private mapOrderToDto(order: Order): OutputUpdateOrderDto {
      return {
         id: order.getId(),
         customerId: order.getCustomerId(),
         products: order.getItems().map(item => {
            return {
               id: item.getProductId(),
               name: item.getProductName(),
               quantity: item.getQuantity(),
               price: item.getPrice(),
            };
         }),
         total: order.total(),
      };
   }
}

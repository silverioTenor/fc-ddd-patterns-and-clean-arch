import IOrderRepository from '@domain/checkout/repository/order.interface';
import { InputCreateOrderDto, OutputCreateOrderDto } from './create.order.dto';
import Mapper from '@util/mapper';
import Order from '@domain/checkout/entity/order';
import OrderItem from '../../../domain/checkout/entity/order-item';
import OrderFactory from '../../../domain/checkout/factory/order-factory';

export default class CreateOrderUseCase {
   constructor(private orderRepository: IOrderRepository) {}

   async execute(input: InputCreateOrderDto): Promise<OutputCreateOrderDto> {
      const factory = new OrderFactory();
      const order = factory.create({
         customerId: input.customerId,
         products: input.products as any,
      });

      await this.orderRepository.create(order);

      const orderItemsPromise = order.getItems().map((item: OrderItem) => {
         return this.orderRepository.createOrderItem(item, order.getId());
      });

      await Promise.all(orderItemsPromise);

      return Mapper.convertTo<Order, OutputCreateOrderDto>(order);
   }
}

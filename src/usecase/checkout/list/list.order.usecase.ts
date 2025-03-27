import Order from '@domain/checkout/entity/order';
import IOrderRepository from '@domain/checkout/repository/order.interface';
import Mapper from '@util/mapper';
import { OutputListOrderDto } from './list.order.dto';

export default class ListOrderUseCase {
   constructor(private orderRepository: IOrderRepository) {}

   async execute(): Promise<OutputListOrderDto[]> {
      const orders = await this.orderRepository.findAll();
      return Mapper.convertListTo<Order, OutputListOrderDto>(orders, ['notification']);
   }
}

import { IFactory } from '@domain/@shared/factory/factory.interface';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';
import { IOrderPayload } from './order-factory.interface';

export default class OrderFactory implements IFactory<Order> {
   create(payload: IOrderPayload): Order {
      const orderItems = payload.products.map((product: any, i: number) => {
         return new OrderItem(
            product.id,
            product.name,
            product.quantity,
            product.price,
            payload.orderItemId ? payload.orderItemId[i] : undefined,
         );
      });
      const order = new Order(payload.customerId, orderItems, payload?.orderId);

      return order;
   }
}

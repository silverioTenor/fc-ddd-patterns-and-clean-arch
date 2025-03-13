import { IFactory } from '../../@shared/factory/factory.interface';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';
import { IOrderPayload } from './order-factory.interface';

export default class OrderFactory implements IFactory<Order> {
   create(payload: IOrderPayload): Order {
      const orderItems = payload.products.map((product: any) => {
         return new OrderItem(product.id, product.name, product.quantity, product.price);
      });
      const order = new Order(payload.customerId, orderItems, payload?.orderId);

      return order;
   }
}

import { v4 as uuid } from 'uuid';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';
import Customer from '../../customer/entity/customer';

export default class OrderService {
   static calculateTotal(orders: Order[]): number {
      return orders.reduce((acc, order) => acc + order.total(), 0);
   }

   static placeOrder(customer: Customer, items: OrderItem[]): Order {
      let points = 0;

      const order = new Order(customer?.getId(), items);

      if (order.total() >= 10 && order.total() <= 50) {
         points += (order.total() * 5) / 100;
      } else if (order.total() > 50 && order.total() <= 100) {
         points += (order.total() * 10) / 100;
      } else if (order.total() > 100) {
         points += (order.total() * 15) / 100;
      }

      customer.addPoints(Math.round(points));

      return order;
   }
}

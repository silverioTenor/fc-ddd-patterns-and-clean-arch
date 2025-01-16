import { v4 as uuid } from 'uuid';
import OrderItem from '../entity/order_item';
import Order from '../entity/order';
import OrderService from './order.service';
import Customer from '../entity/customer';

describe('Order service unit tests', () => {
   it('should get total price of all orders', () => {
      const item1 = new OrderItem(uuid(), uuid(), 'Product 1', 60, 20);
      const item2 = new OrderItem(uuid(), uuid(), 'Product 2', 40, 10);

      const order = new Order(uuid(), uuid(), [item1, item2]);

      const item3 = new OrderItem(uuid(), uuid(), 'Product 3', 30, 5);
      const item4 = new OrderItem(uuid(), uuid(), 'Product 4', 20, 2);

      const order2 = new Order(uuid(), uuid(), [item3, item4]);

      const totalPrice = OrderService.calculateTotal([order, order2]);

      expect(totalPrice).toBe(1790);
   });

   it('should place an order', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const item = new OrderItem(uuid(), uuid(), 'Product 1', 60, 2);

      const order = OrderService.placeOrder(customer, [item]);

      expect(customer.rewardPoints).toBe(18);
      expect(order.total()).toBe(120);
   });
});

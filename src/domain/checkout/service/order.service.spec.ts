import { v4 as uuid } from 'uuid';
import OrderItem from '../entity/order-item';
import Order from '../entity/order';
import OrderService from './order.service';
import Customer from '../../customer/entity/customer';

describe('Order service unit tests', () => {
   it('should get total price of all orders', () => {
      const item1 = new OrderItem(uuid(), 'Product 1', 60, 20);
      const item2 = new OrderItem(uuid(), 'Product 2', 40, 10);

      const order = new Order(uuid(), [item1, item2]);

      const item3 = new OrderItem(uuid(), 'Product 3', 30, 5);
      const item4 = new OrderItem(uuid(), 'Product 4', 20, 2);

      const order2 = new Order(uuid(), [item3, item4]);

      const totalPrice = OrderService.calculateTotal([order, order2]);

      expect(totalPrice).toBe(1790);
   });

   it('should place an order and generate 5% points on the total amount', () => {
      const customer = new Customer('Willy Wonka');
      const item = new OrderItem(uuid(), 'Product 1', 60, 2);

      const order = OrderService.placeOrder(customer, [item]);

      expect(customer.rewardPoints).toBe(18);
      expect(order.total()).toBe(120);
   });

   it('should place an order and generate 10% points on the total amount', () => {
      const customer = new Customer('Willy Wonka');
      const item2 = new OrderItem(uuid(), 'Product 2', 10, 3);
      const order2 = OrderService.placeOrder(customer, [item2]);

      expect(customer.rewardPoints).toBe(2);
      expect(order2.total()).toBe(30);
   });

   it('should place an order and generate 15% points on the total amount', () => {
      const customer = new Customer('Willy Wonka');

      const item3 = new OrderItem(uuid(), 'Product 3', 2, 35);
      const order3 = OrderService.placeOrder(customer, [item3]);

      expect(customer.rewardPoints).toBe(7);
      expect(order3.total()).toBe(70);
   });
});

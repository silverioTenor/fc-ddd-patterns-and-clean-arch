import { v4 as uuid } from 'uuid';
import Order from './order';
import OrderItem from './order-item';

describe('Order unit tests', () => {
   it('should create an instance', () => {
      const item1 = new OrderItem(uuid(), 'Product 1', 1, 10);
      const item2 = new OrderItem(uuid(), 'Product 2', 2, 20);
      const order = new Order(uuid(), [item1, item2]);

      expect(order).toBeInstanceOf(Order);
      expect(order.getId()).toBeDefined();
      expect(order.getCustomerId()).toBeDefined();
      expect(order.getItems().length > 0).toBeTruthy();
   });

   it('should throw an error when create an instance without items', () => {
      expect(() => new Order(uuid(), [])).toThrow('Must have at least one item!');
   });

   it('should throw an error when creating an instance without a customer ID', () => {
      expect(() => new Order('', [])).toThrow('Customer id is required!');
   });

   it('should add an item', () => {
      const item1 = new OrderItem(uuid(), 'Product', 1, 10);
      const item2 = new OrderItem(uuid(), 'Product2', 1, 10);
      const order = new Order(uuid(), [item1]);

      order.addItem(item2);

      expect(order['items'].length).toBe(2);
   });

   it('should remove an item', () => {
      const item1 = new OrderItem(uuid(), 'Product', 1, 10);
      const item2 = new OrderItem(uuid(), 'Product2', 1, 10);
      const order = new Order(uuid(), [item1, item2]);

      order.removeItem(item2);

      expect(order['items'].length).toBe(1);
   });

   it('should calculate the total', () => {
      const item1 = new OrderItem(uuid(), 'Product 1', 1, 10);
      const item2 = new OrderItem(uuid(), 'Product 2', 2, 20);
      const order = new Order(uuid(), [item1, item2]);

      expect(order.total()).toBe(50);
   });

   it('should return a string representation', () => {
      const item = new OrderItem(uuid(), 'Product 1', 1, 10);
      const order = new Order(uuid(), [item]);

      expect(order.toString()).toBe(`Order #${order['id']} - Customer #${order['customerId']}`);
   });

   it('throw an error when quantity is less than or equal to zero', () => {
      const item1 = new OrderItem(uuid(), 'Product 1', 2, 10);
      const item2 = new OrderItem(uuid(), 'Product 2', 1, 20);
      const item3 = {
         id: uuid(),
         productId: uuid(),
         productName: 'Product 3',
         quantity: -7,
         price: 30,
      } as unknown as OrderItem;

      expect(() => {
         new Order(uuid(), [item1, item2, item3]);
      }).toThrow('Quantity must be greater than zero!');
   });

   it('should calculate total', () => {
      const item1 = new OrderItem(uuid(), 'Product 1', 1, 10);
      const item2 = new OrderItem(uuid(), 'Product 2', 2, 20);
      const order = new Order(uuid(), [item1, item2]);

      expect(order.total()).toBe(50);

      order.addItem(new OrderItem(uuid(), 'Product 3', 1, 30));
      expect(order.total()).toBe(80);
   });
});

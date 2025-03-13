import { v4 as uuid } from 'uuid';
import OrderItem from './order-item';

describe('OrderItem unit tests', () => {
   it('should create an order item', () => {
      const orderItem = new OrderItem(uuid(), 'P1', 4, 12);

      expect(orderItem).toBeDefined();
      expect(orderItem.getId()).toBeDefined();
      expect(orderItem.getProductId()).toBeDefined();
      expect(orderItem.getProductName()).toBe('P1');
      expect(orderItem.getQuantity).toBe(4);
      expect(orderItem.getPrice()).toBe(12);
   });

   it('should throw an error when creating an order item with invalid product ID', () => {
      expect(() => new OrderItem('', 'P1', 4, 12)).toThrow('Product ID is required!');
   });

   it('should throw an error when creating an order item with invalid product name', () => {
      expect(() => new OrderItem(uuid(), '', 4, 12)).toThrow('Product name is required!');
   });

   it('should throw an error when creating an order item with invalid quantity', () => {
      expect(() => new OrderItem(uuid(), 'P1', 0, 12)).toThrow(
         'Quantity must be greater than zero!',
      );
   });

   it('should throw an error when creating an order item with invalid price', () => {
      expect(() => new OrderItem(uuid(), 'P1', 4, 0)).toThrow('Price is required!');
   });

   it('should calculate the total price of the order item', () => {
      const orderItem = new OrderItem(uuid(), 'P1', 4, 12);

      expect(orderItem.orderItemTotal()).toBe(48);
   });

   it('should return a string representation of the order item', () => {
      const orderItem = new OrderItem(uuid(), 'P1', 4, 12);

      expect(orderItem.toString()).toBe('P1 - 4 x 12');
   });
});

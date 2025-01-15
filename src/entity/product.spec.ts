import { v4 as uuid } from 'uuid';
import Product from './product';

describe('Product unit tests', () => {
   it('should create a new Product instance', () => {
      // Arrange
      const id = uuid();
      const name = 'Product Name';
      const price = 100;
      // Act
      const product = new Product(id, name, price);
      // Assert
      expect(product).toBeInstanceOf(Product);
      expect(product['id']).toBe(id);
      expect(product['name']).toBe(name);
      expect(product['price']).toBe(price);
   });

   it('should throw an error if the ID is not a valid UUID', () => {
      expect(() => new Product('invalid-uuid', 'Product Name', 100)).toThrow(
         'ID is required and must be a valid UUID',
      );
   });

   it('should throw an error if the name is empty', () => {
      expect(() => new Product(uuid(), '', 100)).toThrow('Name is required');
   });

   it('should throw an error if the price is less than or equal to zero', () => {
      expect(() => new Product(uuid(), 'Product Name', 0)).toThrow(
         'Price must be greater than zero',
      );
   });

   it('should change the price of the product', () => {
      const product = new Product(uuid(), 'Product Name', 100);
      product.changePrice(200);

      expect(product['price']).toBe(200);
   });
});

import { v4 as uuid } from 'uuid';
import Product from '../entity/product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
   it('should change the prices of all products', async () => {
      const product1 = new Product(uuid(), 'Product 1', 10);
      const product2 = new Product(uuid(), 'Product 2', 20);
      const products = [product1, product2];

      ProductService.increasePrice(products, 100);

      expect(product1.price).toBe(20);
      expect(product2.price).toBe(40);
   });
});

import ProductService from './product.service';
import Product from '../entity/product';

describe('Product service unit tests', () => {
   it('should change the prices of all products', async () => {
      const product1 = new Product('Product 1', 10);
      const product2 = new Product('Product 2', 20);
      const products = [product1, product2];

      ProductService.increasePrice(products, 100);

      expect(product1.getPrice()).toBe(20);
      expect(product2.getPrice()).toBe(40);
   });
});

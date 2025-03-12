import Product from '@domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';

const productOne = new Product('Product 1', 29.9);
const productTwo = new Product('Product 2', 49.9);

const MockRepository = () => {
   return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
      create: jest.fn(),
      update: jest.fn(),
   };
};

describe('Unit test - Listing product', () => {
   it('should return a list of products', async () => {
      const productRepository = MockRepository();
      const listProductUseCase = new ListProductUseCase(productRepository);

      await productRepository.create(productOne);
      await productRepository.create(productTwo);

      const products = await listProductUseCase.execute();

      expect(products).toEqual([productOne, productTwo]);
      expect(products[0].name).toBe('Product 1');
      expect(products[1].name).toBe('Product 2');
   });

   it('should return an empty list when no producs are found', async () => {
      const MockRepository2 = () => {
         return {
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([])),
            create: jest.fn(),
            update: jest.fn(),
         };
      };
      const productRepository = MockRepository2();
      const listProductUseCase = new ListProductUseCase(productRepository);

      const products = await listProductUseCase.execute();

      expect(products).toEqual([]);
   });
});

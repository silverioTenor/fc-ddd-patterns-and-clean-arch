import Product from '@domain/product/entity/product';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('Product 1', 19.9);

const MockRepository = () => {
   return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
   };
};

describe('Unit test - Updating product', () => {
   it('should update a product', async () => {
      const productRepository = MockRepository();
      const updateProductUseCase = new UpdateProductUseCase(productRepository);

      await productRepository.create(product);

      const input = {
         id: product.getId(),
         name: 'Product Updated',
         price: 29.9,
      };

      const result = await updateProductUseCase.execute(input);
      expect(result).toEqual(input);
      expect(result.name).toBe('Product Updated');
   });

   it('should throw an error when updating a product', async () => {
      const mockRepo2 = () => {
         return {
            find: jest.fn().mockRejectedValue(new Error('Product not found!')),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
         };
      }

      const productRepository = mockRepo2();
      const updateProductUseCase = new UpdateProductUseCase(productRepository);

      await productRepository.create(product);

      const input = {
         id: 'invalid-id',
         name: 'Product Updated',
         price: 29.9,
      };

      await expect(updateProductUseCase.execute(input)).rejects.toThrow('Product not found!');
   });
});

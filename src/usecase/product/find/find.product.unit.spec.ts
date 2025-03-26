import Product from "@domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase";

const product = new Product('Product 1', 19.90);

const MockRepository = () => {
   return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
   }
}

describe('Unit test - Finding product', () => {
   it('should find a product', async () => {
      const productRepository = MockRepository();
      const findProductUseCase = new FindProductUseCase(productRepository);

      await productRepository.create(product);

      const input = { id: product.getId() }
      const foundProduct = await findProductUseCase.execute(input);

      expect(foundProduct.id).toBe(product.getId());
      expect(foundProduct).toEqual({
         id: product.getId(),
         name: product.getName(),
         price: product.getPrice(),
      });
   })
});

import CreateProductUsecase from "./create.product.usecase";

const input = { name: 'Product 1', price: 19.9 };

const MockRepository = () => {
   return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
   };
};

describe('Unit test - product creation', () => {
   it('should create a product', async () => {
      const productRepository = MockRepository();
      const createProductUseCase = new CreateProductUsecase(productRepository);

      await expect(createProductUseCase.execute(input)).resolves.toHaveProperty('id');
   });

      it('should throw an error when creating a product without name', async () => {
         const productRepository = MockRepository();
         const createProductUseCase = new CreateProductUsecase(productRepository);

         input.name = '';

         await expect(createProductUseCase.execute(input)).rejects.toThrow('Name is required');
      });
});

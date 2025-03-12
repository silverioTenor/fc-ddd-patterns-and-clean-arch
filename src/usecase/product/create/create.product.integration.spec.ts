import { Sequelize } from 'sequelize-typescript';
import CreateProductUsecase from './create.product.usecase';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import ProductRepository from '../../../infra/product/db/sequelize/repository/product.repository';

const input = { name: 'Product 1', price: 19.9 };

describe('Integration test - product creation', () => {
   let sequelize: Sequelize;

   beforeEach(async () => {
      sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: ':memory:',
         logging: false,
         sync: { force: true },
      });

      sequelize.addModels([ProductModel]);
      await sequelize.sync();
   });
   it('should create a product', async () => {
      const productRepository = new ProductRepository();
      const createProductUseCase = new CreateProductUsecase(productRepository);

      await expect(createProductUseCase.execute(input)).resolves.toHaveProperty('id');
   });

   it('should throw an error when creating a product without name', async () => {
      const productRepository = new ProductRepository();
      const createProductUseCase = new CreateProductUsecase(productRepository);

      input.name = '';

      await expect(createProductUseCase.execute(input)).rejects.toThrow('Name is required');
   });
});

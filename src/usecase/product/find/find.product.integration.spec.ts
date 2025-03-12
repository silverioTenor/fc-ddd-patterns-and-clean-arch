import { Sequelize } from 'sequelize-typescript';
import Product from '@domain/product/entity/product';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import ProductRepository from '@infra/product/db/sequelize/repository/product.repository';
import FindProductUseCase from './find.product.usecase';

const product = new Product('Product 1', 19.9);

describe('Integration test - Finding product', () => {
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

   it('should find a product', async () => {
      const productRepository = new ProductRepository();
      const findProductUseCase = new FindProductUseCase(productRepository);

      await productRepository.create(product);

      const input = { id: product.getId() }
      const foundProduct = await findProductUseCase.execute(input);

      expect(foundProduct).toEqual(product);
      expect(foundProduct.id).toBe(product.getId());
   });
});

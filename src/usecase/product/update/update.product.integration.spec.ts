import { Sequelize } from 'sequelize-typescript';
import Product from '@domain/product/entity/product';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import ProductRepository from '@infra/product/db/sequelize/repository/product.repository';
import UpdateProductUseCase from './update.product.usecase';

const product = new Product('Product 1', 19.9);

describe('Integration test - Updating product', () => {
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

   it('should update a product', async () => {
      const productRepository = new ProductRepository();
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
      const productRepository = new ProductRepository();
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

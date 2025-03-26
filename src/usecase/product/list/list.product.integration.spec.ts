import Product from '@domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import ProductRepository from '@infra/product/db/sequelize/repository/product.repository';

const productOne = new Product('Product 1', 29.9);
const productTwo = new Product('Product 2', 49.9);

describe('Unit test - Listing product', () => {
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

   it('should return a list of products', async () => {
      const productRepository = new ProductRepository();
      const listProductUseCase = new ListProductUseCase(productRepository);

      await productRepository.create(productOne);
      await productRepository.create(productTwo);

      const products = await listProductUseCase.execute();

      expect(products[0].name).toBe('Product 1');
      expect(products[1].name).toBe('Product 2');
      expect(products).toEqual([
         {
            id: productOne.getId(),
            name: productOne.getName(),
            price: productOne.getPrice(),
         },
         {
            id: productTwo.getId(),
            name: productTwo.getName(),
            price: productTwo.getPrice(),
         },
      ]);
   });

   it('should return an empty list when no producs are found', async () => {
      const productRepository = new ProductRepository();
      const listProductUseCase = new ListProductUseCase(productRepository);

      const products = await listProductUseCase.execute();

      expect(products).toEqual([]);
   });
});

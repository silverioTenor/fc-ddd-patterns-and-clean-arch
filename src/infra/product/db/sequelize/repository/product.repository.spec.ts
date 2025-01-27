import { Sequelize } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import ProductRepository from './product.repository';
import ProductModel from '../model/product.model';
import Product from '@domain/product/entity/product';

describe('Product repository unit test', () => {
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

   afterEach(async () => {
      await sequelize.close();
   });

   it('should create a product', async () => {
      const productRepository = new ProductRepository();
      const product = new Product(uuid(), 'Product 1', 100);

      await productRepository.create(product);
      const foundProduct = await productRepository.find(product.id);

      expect(foundProduct).not.toBeNull();
      expect(foundProduct).not.toEqual({});
      expect(foundProduct).toStrictEqual(product);
   });

   it('should update a product', async () => {
      const productRepository = new ProductRepository();
      const product = new Product(uuid(), 'Product 1', 100);

      await productRepository.create(product);

      const updateProduct = new Product(product.id, 'Product 2', 200);
      await productRepository.update(updateProduct);

      const foundProduct = await productRepository.find(product.id);

      expect(foundProduct).not.toBeNull();
      expect(foundProduct).not.toEqual({});
      expect(foundProduct).toStrictEqual(updateProduct);
   });

   it('should find a product', async () => {
      const productRepository = new ProductRepository();
      const product = new Product(uuid(), 'Product 1', 100);

      await productRepository.create(product);
      const foundProduct = await productRepository.find(product.id);

      expect(foundProduct).not.toBeNull();
      expect(foundProduct).not.toEqual({});
      expect(foundProduct).toStrictEqual(product);
   });

   it('should find all products', async () => {
      const productRepository = new ProductRepository();
      const product1 = new Product(uuid(), 'Product 1', 100);
      const product2 = new Product(uuid(), 'Product 2', 200);

      await productRepository.create(product1);
      await productRepository.create(product2);

      const foundProducts = await productRepository.findAll();
      const productList = [product1, product2];

      expect(foundProducts).not.toBeNull();
      expect(foundProducts).not.toEqual([]);
      expect(foundProducts).toStrictEqual(productList);
   });
});

import Product from '@domain/product/entity/product';
import IProductRepository from '@domain/product/repository/product.interface';
import ProductModel from '../model/product.model';
import HttpNotFound from '@infra/@Shared/api/error/http.not.found.error';

export default class ProductRepository implements IProductRepository {
   async create(entity: Product): Promise<void> {
      await ProductModel.create({
         id: entity.getId(),
         name: entity.getName(),
         price: entity.getPrice(),
      });
   }

   async update(entity: Product): Promise<void> {
      const product = await ProductModel.findOne({ where: { id: entity.getId() } });
      if (!!product) {
         await product.update(
            {
               name: entity.getName(),
               price: entity.getPrice(),
            },
            { where: { id: entity.getId() } },
         );
      }
   }

   async find(id: string): Promise<Product> {
      const product = await ProductModel.findOne({ where: { id } });

      if (!!product) {
         const newProduct = new Product(product.name, product.price, product.id);
         return newProduct;
      }

      throw new HttpNotFound('Product not found!');
   }

   async findAll(): Promise<Product[]> {
      const products = await ProductModel.findAll();
      return products.map(product => {
         const newProduct = new Product(product.name, product.price, product.id);
         return newProduct;
      });
   }
}

import Product from '@domain/product/entity/product';
import IProductRepository from '@domain/product/repository/product.interface';
import ProductModel from '../model/product.model';

export default class ProductRepository implements IProductRepository {
   async create(entity: Product): Promise<void> {
      await ProductModel.create({
         id: entity.id,
         name: entity.name,
         price: entity.price,
      });
   }

   async update(entity: Product): Promise<void> {
      const product = await ProductModel.findOne({ where: { id: entity.id } });
      if (!!product) {
         await product.update(
            {
               name: entity.name,
               price: entity.price,
            },
            { where: { id: entity.id } },
         );
      }
   }

   async find(id: string): Promise<Product> {
      const product = await ProductModel.findOne({ where: { id } });
      if (!!product) {
         const newProduct = new Product(product.name, product.price);
         newProduct.recoverIdWhenComingFromStorage(product.id);

         return newProduct;
      }

      return  ({} as Product);
   }

   async findAll(): Promise<Product[]> {
      const products = await ProductModel.findAll();
      return products.map(product => {
         const newProduct = new Product(product.name, product.price);
         newProduct.recoverIdWhenComingFromStorage(product.id);
         
         return newProduct;
      });
   }
}

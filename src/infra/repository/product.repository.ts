import Product from '../../domain/entity/product';
import IProductRepository from '../../domain/repository/repository.interface';
import ProductModel from '../db/sequelize/model/product.model';

export default class ProductRepository implements IProductRepository<Product> {
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
      return !!product ? new Product(product.id, product.name, product.price) : ({} as Product);
   }

   async findAll(): Promise<Product[]> {
      const products = await ProductModel.findAll();
      return products.map((product) => new Product(product.id, product.name, product.price));
   }
}

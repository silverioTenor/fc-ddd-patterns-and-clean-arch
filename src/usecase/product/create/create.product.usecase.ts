import IProductRepository from '@domain/product/repository/product.interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create.product.dto';
import ProductFactory from '@domain/product/factory/product.factory';
import Mapper from '@util/mapper';
import Product from '@domain/product/entity/product';

export default class CreateProductUsecase {
   constructor(private productRepository: IProductRepository) {}

   async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
      const factory = new ProductFactory();
      const product = factory.create({ type: 'A', name: input.name, price: input.price });

      await this.productRepository.create(product);
      return Mapper.convertTo<Product, OutputCreateProductDto>(product, ['notification']);
   }
}

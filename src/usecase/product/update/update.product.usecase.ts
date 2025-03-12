import Product from '../../../domain/product/entity/product';
import ProductFactory from '../../../domain/product/factory/product.factory';
import IProductRepository from '../../../domain/product/repository/product.interface';
import Mapper from '../../../util/mapper';
import { InputUpdateProducDto, OutputUpdateProductDto } from './update.product.dto';

export default class UpdateProductUseCase {
   constructor(private productRepository: IProductRepository) {}

   async execute(input: InputUpdateProducDto): Promise<OutputUpdateProductDto> {
      const foundProduct = await this.productRepository.find(input.id);
      const isValid = Object.getOwnPropertyNames(foundProduct).includes('id');

      if (isValid) {
         const factory = new ProductFactory();
         const updateProduct = factory.create({
            type: 'A',
            id: input.id,
            name: input.name,
            price: input.price,
         });

         await this.productRepository.update(updateProduct);
         return Mapper.convertTo<Product, OutputUpdateProductDto>(updateProduct);
      }

      throw new Error('Product not found!');
   }
}

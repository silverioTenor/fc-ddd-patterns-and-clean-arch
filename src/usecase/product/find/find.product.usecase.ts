import IProductRepository from '@domain/product/repository/product.interface';
import { InputFindProductDto, OutputFindProductDto } from './find.product.dto';
import Mapper from '@util/mapper';
import Product from '@domain/product/entity/product';

export default class FindProductUseCase {
   constructor(private productRepository: IProductRepository) {}

   async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
      const foundProduct = await this.productRepository.find(input.id);
      return Mapper.convertTo<Product, OutputFindProductDto>(foundProduct);
   }
}

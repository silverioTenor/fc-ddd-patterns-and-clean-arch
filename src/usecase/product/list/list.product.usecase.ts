import IProductRepository from "@domain/product/repository/product.interface";
import { OutputListProductDto } from "./list.product.dto";
import Mapper from "@util/mapper";
import Product from "@domain/product/entity/product";

export default class ListProductUseCase {
   constructor(private productRepository: IProductRepository) {}

   async execute(): Promise<OutputListProductDto[]> {
      const products = await this.productRepository.findAll();
      return Mapper.convertListTo<Product, OutputListProductDto>(products, ['notification']);
   }
}

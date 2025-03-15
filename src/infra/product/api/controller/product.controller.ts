import { Request, Response } from 'express';
import ProductRepository from '../../db/sequelize/repository/product.repository';
import CreateProductUsecase from '@usecase/product/create/create.product.usecase';

export default class ProductController {
   private constructor() {}

   static async create(req: Request, res: Response): Promise<Response> {
      const productRepository = new ProductRepository();
      const createProductUseCase = new CreateProductUsecase(productRepository);

      const inputProductCreate = {
         name: req.body.name,
         price: req.body.price,
      };

      const outputProductCreated = await createProductUseCase.execute(inputProductCreate);
      return res.status(201).json(outputProductCreated);
   }
}

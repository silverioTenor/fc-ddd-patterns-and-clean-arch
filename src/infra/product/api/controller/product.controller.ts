import { Request, Response } from 'express';
import ProductRepository from '../../db/sequelize/repository/product.repository';
import CreateProductUsecase from '@usecase/product/create/create.product.usecase';
import FindProductUseCase from '@usecase/product/find/find.product.usecase';
import ListProductUseCase from '@usecase/product/list/list.product.usecase';
import UpdateProductUseCase from '@usecase/product/update/update.product.usecase';

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

   static async update(req: Request, res: Response): Promise<Response> {
      const productRepository = new ProductRepository();
      const updateProductUseCase = new UpdateProductUseCase(productRepository);

      const inputProductUpdate = {
         id: req.params.id,
         name: req.body.name,
         price: req.body.price,
      };

      const outputProductUpdated = await updateProductUseCase.execute(inputProductUpdate);
      return res.status(200).json(outputProductUpdated);
   }

   static async find(req: Request, res: Response): Promise<Response> {
      const productRepository = new ProductRepository();
      const findProductUseCase = new FindProductUseCase(productRepository);

      const inputProductFind = { id: req.params.id };
      const outputProductFound = await findProductUseCase.execute(inputProductFind);

      return res.status(200).json(outputProductFound);
   }

   static async list(req: Request, res: Response): Promise<Response> {
      const productRepository = new ProductRepository();
      const listProductUseCase = new ListProductUseCase(productRepository);

      const outputProductList = await listProductUseCase.execute();

      return res.status(200).json({ products: outputProductList });
   }
}

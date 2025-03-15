import { Request, Response, Router } from 'express';
import ProductController from '../controller/product.controller';

const productRouter = Router();

productRouter.post('/', async (req: Request, res: Response) => {
   await ProductController.create(req, res);
});

export default productRouter;

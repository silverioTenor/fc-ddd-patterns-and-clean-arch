import { Request, Response, Router } from 'express';
import ProductController from '../controller/product.controller';

const productRouter = Router();

productRouter.post('/', async (req: Request, res: Response) => {
   await ProductController.create(req, res);
});

productRouter.put('/:id', async (req: Request, res: Response) => {
   await ProductController.update(req, res);
});

productRouter.get('/:id', async (req: Request, res: Response) => {
   await ProductController.find(req, res);
});

productRouter.get('/', async (req: Request, res: Response) => {
   await ProductController.list(req, res);
});

export default productRouter;

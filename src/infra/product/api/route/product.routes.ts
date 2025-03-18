import { Request, Response, Router } from 'express';
import ProductController from '../controller/product.controller';

const productRouter = Router();

productRouter.post('/create', async (req: Request, res: Response) => {
   await ProductController.create(req, res);
});

productRouter.get('/find/:id', async (req: Request, res: Response) => {
   await ProductController.find(req, res);
});

productRouter.put('/update/:id', async (req: Request, res: Response) => {
   await ProductController.update(req, res);
});

productRouter.get('/', async (req: Request, res: Response) => {
   await ProductController.list(req, res);
});

export default productRouter;

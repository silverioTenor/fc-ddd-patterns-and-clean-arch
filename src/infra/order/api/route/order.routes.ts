import { Request, Response, Router } from 'express';
import OrderController from '../controller/order.controller';

const orderRouter = Router();

orderRouter.post('/', async (req: Request, res: Response) => {
   await OrderController.create(req, res);
});

orderRouter.get('/:id', async (req: Request, res: Response) => {
   await OrderController.find(req, res);
});

orderRouter.put('/:id', async (req: Request, res: Response) => {
   await OrderController.update(req, res);
});

export default orderRouter;

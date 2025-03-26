import { Request, Response, Router } from 'express';
import OrderController from '../controller/order.controller';

const orderRouter = Router();

orderRouter.post('/create', async (req: Request, res: Response) => {
   await OrderController.create(req, res);
});

orderRouter.get('/find/:id', async (req: Request, res: Response) => {
   await OrderController.find(req, res);
});

orderRouter.put('/update/:id', async (req: Request, res: Response) => {
   await OrderController.update(req, res);
});

orderRouter.get('/', async (req: Request, res: Response) => {
   await OrderController.list(req, res);
});

export default orderRouter;

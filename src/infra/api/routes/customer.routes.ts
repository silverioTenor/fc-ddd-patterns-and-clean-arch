import { Request, Response, Router } from 'express';
import CustomerController from '../controllers/customer.controller';

const customerRouter = Router();

customerRouter.post('/', async (req: Request, res: Response) => {
   await CustomerController.create(req, res);
});

customerRouter.put('/:id', async (req: Request, res: Response) => {
   await CustomerController.update(req, res);
});

customerRouter.patch('/address/:id', async (req: Request, res: Response) => {
   await CustomerController.updateAddress(req, res);
});

customerRouter.get('/:id', async (req: Request, res: Response) => {
   await CustomerController.find(req, res);
});

customerRouter.get('/', async (req: Request, res: Response) => {
   await CustomerController.list(req, res);
});

export default customerRouter;

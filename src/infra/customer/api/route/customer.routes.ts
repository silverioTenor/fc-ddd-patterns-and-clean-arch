import { Request, Response, Router } from 'express';
import CustomerController from '../controller/customer.controller';

const customerRouter = Router();

customerRouter.post('/create', async (req: Request, res: Response) => {
   await CustomerController.create(req, res);
});

customerRouter.patch('/update/:id', async (req: Request, res: Response) => {
   await CustomerController.update(req, res);
});

customerRouter.put('/update-address/:id', async (req: Request, res: Response) => {
   await CustomerController.updateAddress(req, res);
});

customerRouter.get('/find/:id', async (req: Request, res: Response) => {
   await CustomerController.find(req, res);
});

customerRouter.get('/', async (req: Request, res: Response) => {
   await CustomerController.list(req, res);
});

export default customerRouter;

import { Request, Response, Router } from 'express';
import CustomerController from '../controllers/customer.controller';

const customerRouter = Router();

customerRouter.post('/', async (req: Request, res: Response) => {
   await CustomerController.create(req, res);
});

export default customerRouter;

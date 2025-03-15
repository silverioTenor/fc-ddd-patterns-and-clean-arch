import { Router } from 'express';
import customerRouter from '@infra/customer/api/route/customer.routes';

const routes = Router();

routes.use('/customer', customerRouter);

export default routes;

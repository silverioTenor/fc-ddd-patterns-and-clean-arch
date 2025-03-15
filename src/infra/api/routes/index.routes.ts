import { Router } from 'express';
import customerRouter from './customer.routes';

const routes = Router();

routes.use('/customer', customerRouter);

export default routes;

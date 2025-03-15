import { Router } from 'express';
import customerRouter from '@infra/customer/api/route/customer.routes';
import productRouter from '@infra/product/api/route/product.routes';

const routes = Router();

routes.use('/customer', customerRouter);
routes.use('/product', productRouter);

export default routes;

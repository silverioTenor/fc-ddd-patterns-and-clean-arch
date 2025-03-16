import 'express-async-errors';
import express, { NextFunction } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../customer/db/sequelize/model/customer.model';
import ProductModel from '../../product/db/sequelize/model/product.model';
import routes from './route/index.routes';
import { Request, Response } from 'express';
import ErrorHandling from './middleware/error.handling.midlleware';
import OrderModel from '../../order/db/sequelize/model/order.model';
import OrderItemModel from '../../order/db/sequelize/model/order-item.model';

export const app = express();
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   return ErrorHandling.handle(err, req, res, next) as any;
});

export let sequelize: Sequelize;

const setupDb = async () => {
   sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
   });

   sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
   await sequelize.sync();
};
setupDb();

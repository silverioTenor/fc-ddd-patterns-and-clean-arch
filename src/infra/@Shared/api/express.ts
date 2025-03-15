import 'express-async-errors';
import express, { NextFunction } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../customer/db/sequelize/model/customer.model';
import routes from './route/index.routes';
import { Request, Response } from 'express';
import ErrorHandling from './middleware/error.handling.midlleware';

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

   sequelize.addModels([CustomerModel]);
   await sequelize.sync();
};
setupDb();

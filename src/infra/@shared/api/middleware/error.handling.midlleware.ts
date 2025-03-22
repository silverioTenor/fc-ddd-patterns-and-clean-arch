import { NextFunction, Request, Response } from 'express';
import AppError from '../error/app.error';
import NotificationError from '@domain/@shared/notification/notification.error';

export default class ErrorHandling {
   static handle(err: Error | AppError, _: Request, res: Response, _next: NextFunction): Response {
      if (err instanceof AppError) {
         return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
         });
      } else if(err instanceof NotificationError) {
         return res.status(400).json(err);
      }

      console.error(err);

      return res.status(500).json({
         status: 'error',
         message: 'Internal server error',
      });
   }
}

import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/app.error';

export default class ErrorHandling {
   static handle(err: Error | AppError, _: Request, res: Response, _next: NextFunction): Response {
      if (err instanceof AppError) {
         return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
         });
      }

      console.error(err);

      return res.status(500).json({
         status: 'error',
         message: 'Internal server error',
      });
   }
}

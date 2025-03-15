import { Request, Response } from 'express';
import CreateCustomerUseCase from '@usecase/customer/create/create.customer.usecase';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';

export default class CustomerController {
   static async create(req: Request, res: Response): Promise<Response> {
      const customerRepository = new CustomerRepository();
      const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

      const inputCustomerCreate = {
         name: req.body.name,
         address: {
            street: req.body.address.street,
            number: req.body.address.number,
            city: req.body.address.city,
            state: req.body.address.state,
            country: req.body.address.country,
            postalCode: req.body.address.postalCode,
         },
         type: req.body.type,
      };

      const outputCustomerCreated = await customerCreateUseCase.execute(inputCustomerCreate);
      return res.status(201).json(outputCustomerCreated);
   }
}

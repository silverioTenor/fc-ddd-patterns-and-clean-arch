import { Request, Response } from 'express';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import CreateCustomerUseCase from '@usecase/customer/create/create.customer.usecase';
import ListCustomerUseCase from '@usecase/customer/list/list.customer.usecase';
import FindCustomerUseCase from '@usecase/customer/find/find.customer.usecase';
import UpdateCustomerUseCase from '@usecase/customer/update/update.customer.usecase';
import UpdateAddressUseCase from '@usecase/customer/update/update.address.usecase';

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

   static async update(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;

      const customerRepository = new CustomerRepository();
      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const inputCustomerUpdate = {
         id,
         name: req.body.name,
         type: req.body.type,
      };

      const outputCustomerUpdated = await updateCustomerUseCase.execute(inputCustomerUpdate);
      return res.status(200).json(outputCustomerUpdated);
   }

   static async updateAddress(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;

      const customerRepository = new CustomerRepository();
      const updateAddressUseCase = new UpdateAddressUseCase(customerRepository);

      const inputCustomerUpdate = {
         id,
         address: req.body.address,
         type: req.body.type,
      };

      const outputAddressUpdated = await updateAddressUseCase.execute(inputCustomerUpdate);
      return res.status(200).json(outputAddressUpdated);
   }

   static async find(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;

      const customerRepository = new CustomerRepository();
      const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

      const foundCustomer = await findCustomerUseCase.execute({ id });
      return res.status(200).json(foundCustomer);
   }

   static async list(req: Request, res: Response): Promise<Response> {
      const customerRepository = new CustomerRepository();
      const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

      const customers = await listCustomerUseCase.execute();
      return res.status(200).json({ customers });
   }
}

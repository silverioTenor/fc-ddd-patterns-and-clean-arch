import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import ListCustomerUseCase from './list.customer.usecase';
import CreateCustomerUseCase from '../create/create.customer.usecase';
import { customerSeed } from '@util/seed';

describe('Find customer useCase - integration test', () => {
   let sequelize: Sequelize;

   beforeEach(async () => {
      sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: ':memory:',
         logging: false,
         sync: { force: true },
      });

      sequelize.addModels([CustomerModel]);
      await sequelize.sync();
   });

   afterEach(async () => {
      await sequelize.close();
   });

   it('should return a customer list', async () => {
      const customerRepository = new CustomerRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
      const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

      const customerCreated = await createCustomerUseCase.execute(customerSeed);
      const customers = await listCustomerUseCase.execute();

      expect(customers).toEqual([customerCreated]);
   });

   it('should return an empty list when no found customers', async () => {
      const customerRepository = new CustomerRepository();
      const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

      const customers = await listCustomerUseCase.execute();

      expect(customers).toEqual([]);
   });
});

import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import Customer from '@domain/customer/entity/customer';
import Address from '@domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

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

   test('should find a customer', async () => {
      const customerRepository = new CustomerRepository();
      const useCase = new FindCustomerUseCase(customerRepository);

      const customer = new Customer('Willy Wonka');
      const address = new Address('Rua dos bobos', 46, 'São Paulo', 'SP', 'Brasil', 12345678);

      customer.changeAddress(address);
      await customerRepository.create(customer);

      const input = { id: customer.getId() };
      const output = {
         id: customer.getId(),
         name: customer.getName(),
         address: {
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            country: customer.getAddress().getCountry(),
            postalCode: customer.getAddress().getPostalCode(),
         },
      };

      const result = await useCase.execute(input);
      expect(result).toEqual(output);
   }, 20000);
});

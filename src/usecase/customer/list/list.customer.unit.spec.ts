import CustomerFactory from '@domain/customer/factory/customer.tactory';
import Address from '@domain/customer/value-object/address';
import ListCustomerUseCase from './list.customer.usecase';
import Mapper from '@util/mapper';

const factory = new CustomerFactory();
const firstCustomer = factory.create({
   type: 'pf',
   name: 'Willy Wonka',
   points: 5,
   address: new Address('Rua A', 20, 'Rio Azul', 'Paraíso', 'Noruega', 12345678),
});
const secondCustomer = factory.create({
   type: 'pf',
   name: 'John Doe',
   points: 5,
   address: new Address('Rua 8', 100, 'Vila Bela', 'Itamaraty', 'Suécia', 87654321),
});
const MockRepository = () => {
   return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([firstCustomer, secondCustomer])),
      create: jest.fn(),
      update: jest.fn(),
      updateAddress: jest.fn(),
   };
};

describe('Unit test - customer list', () => {
   it('should return a customer list', async () => {
      const customerRepository = MockRepository();
      const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

      const customers = await listCustomerUseCase.execute();
      const customersFiltered = Mapper.convertListTo<any, any>(
         [firstCustomer, secondCustomer],
         ['notification'],
      );

      expect(customers).toEqual(customersFiltered);
   });

   it('should return an empty list when no found customers', async () => {
      const FakeRepository = () => {
         return {
            find: jest.fn(),
            findAll: jest.fn().mockReturnValue(Promise.resolve([])),
            create: jest.fn(),
            update: jest.fn(),
            updateAddress: jest.fn(),
         };
      };
      const customerRepository = FakeRepository();
      const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

      const customers = await listCustomerUseCase.execute();

      expect(customers).toEqual([]);
   });
});

import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import Customer from '@domain/customer/entity/customer';
import Address from '@domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer('Willy Wonka');
const address = new Address('Rua dos bobos', 46, 'São Paulo', 'SP', 'Brasil', 12345678);
customer.changeAddress(address);

const MockRepository = () => {
   return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
   };
};

describe('Find customer useCase - unit test', () => {
   it('should find a customer', async () => {
      const customerRepository = MockRepository();
      const useCase = new FindCustomerUseCase(customerRepository);

      const input = { id: customer.id };
      const output = {
         id: customer.id,
         name: customer.name,
         address: {
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state,
            country: address.country,
            postalCode: address.postalCode,
         },
      };

      const result = await useCase.execute(input);
      expect(result).toEqual(output);
   });

   it('should throw an error when trying to find a customer', async () => {
      const customerRepository = MockRepository();
      customerRepository.find.mockImplementation(() => {
         throw new Error('Customer not found!');
      });
      const useCase = new FindCustomerUseCase(customerRepository);
      const input = { id: 'invalid-id' };

      expect(() => {
         return useCase.execute(input);
      }).rejects.toThrow('Customer not found!');
   });
});

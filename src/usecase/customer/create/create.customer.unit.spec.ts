import Customer from '@domain/customer/entity/customer';
import Address from '@domain/customer/value-object/address';
import CreateCustomerUseCase from './create.customer.usecase';

const customer = new Customer('Willy Wonka');
const address = new Address('Rua dos bobos', 46, 'São Paulo', 'SP', 'Brasil', 12345678);
customer.changeAddress(address);

const MockRepository = () => {
   return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
   };
};

describe('Unit Test - Create a customer by use case', () => {
   it('should create a customer', async () => {
      const customerRepository = MockRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

      const input = {
         name: customer.name,
         type: 'pf',
         address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            country: customer.address.country,
            postalCode: customer.address.postalCode,
         },
      };

      expect(await createCustomerUseCase.execute(input)).toBeUndefined();
      expect(async () => await createCustomerUseCase.execute(input)).not.toThrow();
   });

   it('should throw an error when trying create a customer with invalid type', async () => {
      const customerRepository = MockRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

      const input = {
         name: customer.name,
         type: 'any',
         address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            country: customer.address.country,
            postalCode: customer.address.postalCode,
         },
      };

      await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
         'Customer type not allowed',
      );
   });
});

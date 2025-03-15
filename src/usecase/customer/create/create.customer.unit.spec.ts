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
      updateAddress: jest.fn(),
   };
};

describe('Unit Test - Create a customer by use case', () => {
   it('should create a customer', async () => {
      const customerRepository = MockRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

      const input = {
         name: customer.getName(),
         type: 'pf',
         address: {
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            country: customer.getAddress().getCountry(),
            postalCode: customer.getAddress().getPostalCode(),
         },
      };

      const outputCustomerCreated = await createCustomerUseCase.execute(input);

      expect(outputCustomerCreated).toEqual({
         id: outputCustomerCreated.id,
         name: customer.getName(),
         rewardPoints: outputCustomerCreated.rewardPoints,
         active: outputCustomerCreated.active,
         address: {
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            country: customer.getAddress().getCountry(),
            postalCode: customer.getAddress().getPostalCode(),
         },
      });
   });

   it('should throw an error when trying create a customer with invalid type', async () => {
      const customerRepository = MockRepository();
      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

      const input = {
         name: customer.getName(),
         type: 'any',
         address: {
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            country: customer.getAddress().getCountry(),
            postalCode: customer.getAddress().getPostalCode(),
         },
      };

      await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
         'Customer type not allowed',
      );
   });
});

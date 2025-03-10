import CustomerFactory from '@domain/customer/factory/customer.tactory';
import Address from '@domain/customer/value-object/address';
import UpdateCustomerUseCase from './update.customer.usecase';
import UpdateAddressUseCase from './update.address.usecase';

const factory = new CustomerFactory();
const customer = factory.create({
   type: 'pf',
   name: 'Willy Wonka',
   points: 5,
   address: new Address('Rua A', 20, 'Rio Azul', 'Paraíso', 'Noruega', 12345678),
});
const MockRepository = () => {
   return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
   };
};

describe('Unit test - Update a customer', () => {
   it('should update a customer', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const input = {
         id: customer.id,
         name: customer.name,
         type: 'pf',
      };

      await updateCustomerUseCase.execute(input);
   });

   it('should throw an error when trying update a customer without name', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const input = {
         id: customer.id,
         name: '',
         type: 'pf',
      };

      await expect(updateCustomerUseCase.execute(input)).rejects.toThrow('Name is required!');
   });

   it('should throw an error when trying update a customer without type', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const input = {
         id: customer.id,
         name: customer.name,
         type: '',
      };

      await expect(updateCustomerUseCase.execute(input)).rejects.toThrow(
         'Customer type not allowed',
      );
   });

   it('should update an address', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateAddressUseCase = new UpdateAddressUseCase(customerRepository);

      const input = {
         id: customer.id,
         type: 'pf',
         address: customer.address,
      };

      await expect(updateAddressUseCase.execute(input)).resolves.not.toThrow();
   });

   it('should throw an error when trying update an address without postalCode', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateAddressUseCase = new UpdateAddressUseCase(customerRepository);

      const input = {
         id: customer.id,
         type: 'pf',
         address: {
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            country: customer.address.country,
            postalCode: 0,
         },
      };

      await expect(updateAddressUseCase.execute(input)).rejects.toThrow('Postal code is required!');
   });
});

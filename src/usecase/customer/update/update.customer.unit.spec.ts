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
      updateAddress: jest.fn(),
   };
};

describe('Unit test - Update a customer', () => {
   it('should update a customer', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const input = {
         id: customer.getId(),
         name: customer.getName(),
         type: 'pf',
      };

      const outputCustomerUpdated = await updateCustomerUseCase.execute(input);
      expect(outputCustomerUpdated).toEqual({
         id: customer.getId(),
         name: customer.getName(),
         active: customer.isActive(),
         rewardPoints: customer.getRewardPoints(),
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

   it('should throw an error when trying update a customer without name', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

      const input = {
         id: customer.getId(),
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
         id: customer.getId(),
         name: customer.getName(),
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
         id: customer.getId(),
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

      const outputCustomerUpdated = await updateAddressUseCase.execute(input);
      expect(outputCustomerUpdated).toEqual({
         id: customer.getId(),
         name: customer.getName(),
         active: customer.isActive(),
         rewardPoints: customer.getRewardPoints(),
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

   it('should throw an error when trying update an address without postalCode', async () => {
      const customerRepository = MockRepository();
      await customerRepository.create(customer);
      const updateAddressUseCase = new UpdateAddressUseCase(customerRepository);

      const input = {
         id: customer.getId(),
         type: 'pf',
         address: {
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            country: customer.getAddress().getCountry(),
            postalCode: 0,
         },
      };

      await expect(updateAddressUseCase.execute(input)).rejects.toThrow('Postal code is required!');
   });
});

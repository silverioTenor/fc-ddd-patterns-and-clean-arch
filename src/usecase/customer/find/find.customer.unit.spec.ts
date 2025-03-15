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
      updateAddress: jest.fn(),
   };
};

describe('Find customer useCase - unit test', () => {
   it('should find a customer', async () => {
      const customerRepository = MockRepository();
      const useCase = new FindCustomerUseCase(customerRepository);

      const input = { id: customer.getId() };

      const result = await useCase.execute(input);

      expect(result).toEqual({
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

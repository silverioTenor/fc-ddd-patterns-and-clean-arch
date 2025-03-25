import Customer from '@domain/customer/entity/customer';
import Address from '@domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';
import Mapper from '@util/mapper';
import { ICustomer } from '@domain/customer/entity/customer.interface';
import { OutputFindCustomerDto } from './find.customer.dto';

const customer = new Customer('Willy Wonka');
const address = new Address('Rua dos bobos', 46, 'São Paulo', 'SP', 'Brasil', 12345678);
customer.changeAddress(address);

const MockRepository = () => {
   return {
      find: jest.fn().mockImplementation(() => {
         const mapped = Mapper.convertTo<ICustomer, OutputFindCustomerDto>(customer, [
            'notification',
         ]);

         return Promise.resolve(mapped);
      }),
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
      console.log(result)

      expect(result).toEqual({
         id: customer.getId(),
         name: customer.getName(),
         active: customer.isActive(),
         rewardPoints: customer.getRewardPoints(),
         address: {
            street: address.getStreet(),
            number: address.getNumber(),
            city: address.getCity(),
            state: address.getState(),
            country: address.getCountry(),
            postalCode: address.getPostalCode(),
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

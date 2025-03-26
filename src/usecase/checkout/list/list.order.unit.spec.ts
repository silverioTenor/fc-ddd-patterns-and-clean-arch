import { orderSeed } from '@util/seed';
import ListOrderUseCase from './list.order.usecase';

const MockRepository = () => {
   return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([orderSeed])),
      create: jest.fn(),
      update: jest.fn(),
      createOrderItem: jest.fn(),
   };
};

describe('Unit tests - Listing orders', () => {
   it('should list all orders', async () => {
      const fakeRepository = MockRepository();
      const listOrderUseCase = new ListOrderUseCase(fakeRepository);

      const orders = await listOrderUseCase.execute();
      expect(orders).toEqual([orderSeed]);
   });

   it('should return an empty order list', async () => {
      const fakeRepository = MockRepository();
      const listOrderUseCase = new ListOrderUseCase(fakeRepository);

      fakeRepository.findAll.mockImplementation(() => []);

      const orders = await listOrderUseCase.execute();
      expect(orders).toEqual([]);
   });
});

import { orderSeed, orderSeedOutput } from '@util/seed';
import CreateOrderUseCase from '../create/create.order.usecase';
import { OutputCreateOrderDto } from '../create/create.order.dto';
import UpdateOrderUseCase from './update.order.usecase';

const MockRepository = () => {
   return {
      find: jest.fn().mockReturnValue(
         Promise.resolve({
            id: orderSeed.id,
            customerId: orderSeed.customerId,
            items: orderSeed.items,
         }),
      ),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      createOrderItem: jest.fn(),
   };
};
const orderRepository = MockRepository();

let outputOrderCreated: OutputCreateOrderDto;

describe('Unit test - updating order', () => {
   beforeEach(async () => {
      jest.clearAllMocks();

      const createOrderUseCase = new CreateOrderUseCase(orderRepository);
      outputOrderCreated = await createOrderUseCase.execute(orderSeedOutput);
   });

   it('should update an order', async () => {
      const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);

      const input = {
         id: outputOrderCreated.id,
         products: orderSeedOutput.products,
      };
      const outputOrderUpdated = await updateOrderUseCase.execute(input);

      expect(outputOrderUpdated).toStrictEqual({
         id: outputOrderCreated.id,
         customerId: outputOrderCreated.customerId,
         products: orderSeedOutput.products,
         total: orderSeedOutput.total,
      });
   });
});

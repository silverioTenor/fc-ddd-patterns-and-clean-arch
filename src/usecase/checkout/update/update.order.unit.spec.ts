import { orderSeed, productSeed } from '@util/seed';
import CreateOrderUseCase from '../create/create.order.usecase';
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
const fakeRepository = MockRepository();

describe('Unit test - updating order', () => {
   beforeEach(async () => {
      jest.clearAllMocks();
   });

   test('should update an order', async () => {
      /**
       * =====================================
       * ======== CREATE ORDER USECASE =======
       * =====================================
       */

      const createOrderUseCase = new CreateOrderUseCase(fakeRepository);

      const inputCreateOrder = {
         customerId: orderSeed.customerId,
         products: orderSeed.items.map(p => {
            return {
               id: productSeed.id,
               name: p.productName,
               quantity: p.quantity,
               price: p.price,
            };
         }),
      };

      const outputOrderCreated = await createOrderUseCase.execute(inputCreateOrder);

      /**
       * =====================================
       * ======== UPDATE ORDER USECASE =======
       * =====================================
       */

      const updateOrderUseCase = new UpdateOrderUseCase(fakeRepository);

      const input = {
         id: outputOrderCreated.id,
         items: outputOrderCreated.items,
      };
      const outputOrderUpdated = await updateOrderUseCase.execute(input);

      expect(outputOrderUpdated).toEqual({
         id: outputOrderCreated.id,
         customerId: orderSeed.customerId,
         items: orderSeed.items,
         total: orderSeed.total,
      });
   }, 120000);

   test('should throw an error when trying update an order with invalid-uuid', async () => {
      /**
       * =====================================
       * ======== CREATE ORDER USECASE =======
       * =====================================
       */

      const createOrderUseCase = new CreateOrderUseCase(fakeRepository);

      const inputCreateOrder = {
         customerId: orderSeed.customerId,
         products: orderSeed.items.map(p => {
            return {
               id: productSeed.id,
               name: p.productName,
               quantity: p.quantity,
               price: p.price,
            };
         }),
      };

      const outputOrderCreated = await createOrderUseCase.execute(inputCreateOrder);

      /**
       * =====================================
       * ======== UPDATE ORDER USECASE =======
       * =====================================
       */
      fakeRepository.find.mockImplementation(() => {
         throw new Error('Order not found!');
      });
      const updateOrderUseCase = new UpdateOrderUseCase(fakeRepository);

      const input = {
         id: outputOrderCreated.id,
         items: outputOrderCreated.items,
      };

      await expect(updateOrderUseCase.execute(input)).rejects.toThrow('Order not found!');
   }, 120000);
});

import CustomerFactory from '@domain/customer/factory/customer.tactory';
import Address from '@domain/customer/value-object/address';
import ProductFactory from '@domain/product/factory/product.factory';
import FindOrderUseCase from './find.order.usecase';
import OrderFactory from '@domain/checkout/factory/order-factory';

const customerFactory = new CustomerFactory();
const productFactory = new ProductFactory();
const orderFactory = new OrderFactory();

const customer = customerFactory.create({
   type: 'pf',
   name: 'Willy Wonka',
   points: 5,
   address: new Address('Rua das Oliveiras', 50, 'Cidade Bela', 'Rio Bonito', 'Brasil', 12345678),
});

const product = productFactory.create({
   type: 'A',
   name: 'Product XPTO',
   price: 129.9,
});

const order = orderFactory.create({
   customerId: customer.getId(),
   products: [
      {
         id: product.getId(),
         name: product.getName(),
         quantity: 3,
         price: product.getPrice(),
      },
   ],
});

const MockRepository = () => {
   return {
      find: jest.fn().mockReturnValue(Promise.resolve(order)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      createOrderItem: jest.fn(),
   };
};

describe('Unit test - finding order', () => {
   it('should find an order', async () => {
      const mockRepository = MockRepository();
      const findOrderUseCase = new FindOrderUseCase(mockRepository);

      const inputOrder = { id: order.getId() };

      const output = await findOrderUseCase.execute(inputOrder);

      expect(mockRepository.find).toHaveBeenCalledTimes(1);
      expect(output).toStrictEqual({
         id: expect.any(String),
         customerId: customer.getId(),
         items: order.getItems(),
      });
   });
});

import CustomerFactory from '@domain/customer/factory/customer.tactory';
import Address from '@domain/customer/value-object/address';
import ProductFactory from '@domain/product/factory/product.factory';
import CreateCustomerUseCase from '../../customer/create/create.customer.usecase';
import CreateProductUsecase from '../../product/create/create.product.usecase';
import CreateOrderUseCase from './create.order.usecase';

const customerFactory = new CustomerFactory();
const productFactory = new ProductFactory();

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

const MockRepository = () => {
   return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateAddress: jest.fn(),
      createOrderItem: jest.fn(),
   };
};

describe('Unit test - creating order', () => {
   it('should create an order', async () => {
      const fakeRepository = MockRepository();
      const createOrderUseCase = new CreateOrderUseCase(fakeRepository);
      const createCustomerUseCase = new CreateCustomerUseCase(fakeRepository);
      const createProductUseCase = new CreateProductUsecase(fakeRepository);

      const inputCustomer = customer as any;
      const inputProduct = product as any;

      await createCustomerUseCase.execute(inputCustomer);
      const outputProductCreated = await createProductUseCase.execute(inputProduct);

      const inputOrder = {
         customerId: customer.getId(),
         products: [
            {
               id: outputProductCreated.id,
               name: outputProductCreated.name,
               quantity: 2,
               price: outputProductCreated.price,
            },
         ],
      };
      const output = await createOrderUseCase.execute(inputOrder);

      expect(output).toBeDefined();
      expect(output.items.length).toBe(1);
      expect(output.items[0].productName).toBe('Product XPTO');
   });
});

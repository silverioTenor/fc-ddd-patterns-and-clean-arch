import { Sequelize } from 'sequelize-typescript';
import OrderFactory from '../../../domain/checkout/factory/order-factory';
import CustomerFactory from '../../../domain/customer/factory/customer.tactory';
import Address from '../../../domain/customer/value-object/address';
import ProductFactory from '../../../domain/product/factory/product.factory';
import CreateOrderUseCase from './create.order.usecase';
import OrderModel from '../../../infra/order/db/sequelize/model/order.model';
import OrderItemModel from '../../../infra/order/db/sequelize/model/order-item.model';
import OrderRepository from '../../../infra/order/db/sequelize/repository/order.repository';
import CustomerModel from '../../../infra/customer/db/sequelize/model/customer.model';
import ProductModel from '../../../infra/product/db/sequelize/model/product.model';

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

describe('Integration test - creating order', () => {
   let sequelize: Sequelize;

   beforeEach(async () => {
      sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: ':memory:',
         logging: false,
         sync: { force: true },
      });

      sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
      await sequelize.sync();
   });

   it('should create an order', async () => {
      const orderRepository = new OrderRepository();
      const createOrderUseCase = new CreateOrderUseCase(orderRepository);

      const input = {
         customerId: customer.getId(),
         products: [product as any],
      };

      const output = await createOrderUseCase.execute(input);

      expect(output).toBeDefined();
      expect(output.items.length).toBe(1);
      expect(output.items[0].productName).toBe('Product XPTO');
   });
});

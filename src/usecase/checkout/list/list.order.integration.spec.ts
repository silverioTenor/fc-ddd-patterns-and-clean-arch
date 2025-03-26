import { customerSeed, orderSeed, productSeed } from '@util/seed';
import ListOrderUseCase from './list.order.usecase';
import OrderRepository from '@infra/checkout/db/sequelize/repository/order.repository';
import CreateOrderUseCase from '../create/create.order.usecase';
import CreateCustomerUseCase from '../../customer/create/create.customer.usecase';
import CreateProductUsecase from '../../product/create/create.product.usecase';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import ProductRepository from '@infra/product/db/sequelize/repository/product.repository';
import { Sequelize } from 'sequelize-typescript';
import OrderModel from '@infra/checkout/db/sequelize/model/order.model';
import OrderItemModel from '@infra/checkout/db/sequelize/model/order-item.model';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';
import ProductModel from '@infra/product/db/sequelize/model/product.model';

const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

describe('Unit tests - Listing orders', () => {
   let sequelize: Sequelize;

   beforeEach(async () => {
      jest.clearAllMocks();

      sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: ':memory:',
         logging: false,
         sync: { force: true },
      });

      sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
      await sequelize.sync();
   });

   it('should list all orders', async () => {
      /**
       * ================================
       * ======== CREATE USECASES =======
       * ================================
       */

      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
      const createProductUseCase = new CreateProductUsecase(productRepository);
      const createOrderUseCase = new CreateOrderUseCase(orderRepository);

      const outputCustomerCreated = await createCustomerUseCase.execute(customerSeed);
      const outputProductCreated = await createProductUseCase.execute(productSeed);

      const inputCreateOrder = {
         customerId: outputCustomerCreated.id,
         products: orderSeed.items.map(p => {
            return {
               id: outputProductCreated.id,
               name: p.productName,
               quantity: p.quantity,
               price: p.price,
            };
         }),
      };

      /**
       * ===================================
       * ======== LIST ORDER USECASE =======
       * ===================================
       */

      const listOrderUseCase = new ListOrderUseCase(orderRepository);
      const outputOrderCreated = await createOrderUseCase.execute(inputCreateOrder);

      const outputListOrder = await listOrderUseCase.execute();

      expect(outputListOrder).toEqual([outputOrderCreated]);
   });

   it('should return an empty order list', async () => {
      const orderRepository = new OrderRepository();
      const listOrderUseCase = new ListOrderUseCase(orderRepository);

      const orders = await listOrderUseCase.execute();
      expect(orders).toEqual([]);
   });
});

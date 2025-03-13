import { customerSeed, orderSeedOutput, productSeed } from '@util/seed';
import CreateOrderUseCase from '../create/create.order.usecase';
import UpdateOrderUseCase from './update.order.usecase';
import { Sequelize } from 'sequelize-typescript';
import OrderModel from '@infra/order/db/sequelize/model/order.model';
import OrderItemModel from '@infra/order/db/sequelize/model/order-item.model';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import IOrderRepository from '@domain/checkout/repository/order.interface';
import OrderRepository from '@infra/order/db/sequelize/repository/order.repository';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import ProductRepository from '@infra/product/db/sequelize/repository/product.repository';
import CreateCustomerUseCase from '../../customer/create/create.customer.usecase';
import CreateProductUsecase from '../../product/create/create.product.usecase';

const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

describe('Unit test - updating order', () => {
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

   it('should update an order', async () => {
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

      orderSeedOutput.customerId = outputCustomerCreated.id;
      orderSeedOutput.products[0].id = outputProductCreated.id;
      const outputOrderCreated = await createOrderUseCase.execute(orderSeedOutput);

      /**
       * =====================================
       * ======== UPDATE ORDER USECASE =======
       * =====================================
       */

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

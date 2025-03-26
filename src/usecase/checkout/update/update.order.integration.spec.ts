import { customerSeed, orderSeed, productSeed } from '@util/seed';
import CreateOrderUseCase from '../create/create.order.usecase';
import UpdateOrderUseCase from './update.order.usecase';
import { Sequelize } from 'sequelize-typescript';
import OrderModel from '@infra/checkout/db/sequelize/model/order.model';
import OrderItemModel from '@infra/checkout/db/sequelize/model/order-item.model';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import OrderRepository from '@infra/checkout/db/sequelize/repository/order.repository';
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

   test('should update an order', async () => {
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
            }
         }),
      };

      const outputOrderCreated = await createOrderUseCase.execute(inputCreateOrder);

      /**
       * =====================================
       * ======== UPDATE ORDER USECASE =======
       * =====================================
       */

      const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);

      const input = {
         id: outputOrderCreated.id,
         items: outputOrderCreated.items,
      };
      const outputOrderUpdated = await updateOrderUseCase.execute(input);

      expect(outputOrderUpdated).toEqual({
         id: outputOrderCreated.id,
         customerId: outputCustomerCreated.id,
         items: outputOrderCreated.items,
         total: orderSeed.total,
      });
   }, 120000);

   test('should throw an error when trying update an order with invalid-uuid', async () => {
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
            }
         }),
      };

      const outputOrderCreated = await createOrderUseCase.execute(inputCreateOrder);

      /**
       * =====================================
       * ======== UPDATE ORDER USECASE =======
       * =====================================
       */

      const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);

      const input = {
         id: 'invalid-uuid',
         items: outputOrderCreated.items,
      };

      await expect(updateOrderUseCase.execute(input)).rejects.toThrow('Order not found!');
   }, 120000);
});

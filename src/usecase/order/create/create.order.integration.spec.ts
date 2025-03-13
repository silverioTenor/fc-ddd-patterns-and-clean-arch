import { Sequelize } from 'sequelize-typescript';
import CustomerFactory from '@domain/customer/factory/customer.tactory';
import Address from '@domain/customer/value-object/address';
import ProductFactory from '@domain/product/factory/product.factory';
import CreateOrderUseCase from './create.order.usecase';
import OrderModel from '@infra/order/db/sequelize/model/order.model';
import OrderItemModel from '@infra/order/db/sequelize/model/order-item.model';
import OrderRepository from '@infra/order/db/sequelize/repository/order.repository';
import CustomerModel from '@infra/customer/db/sequelize/model/customer.model';
import ProductModel from '@infra/product/db/sequelize/model/product.model';
import CustomerRepository from '@infra/customer/db/sequelize/repository/customer.repository';
import ProductRepository from '@infra/product/db/sequelize/repository/product.repository';
import CreateCustomerUseCase from '../../customer/create/create.customer.usecase';
import CreateProductUsecase from '../../product/create/create.product.usecase';

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

const customerRepository = new CustomerRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository();

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
      /**
       * ================================
       * ======== CREATE USECASES =======
       * ================================
       */

      const createOrderUseCase = new CreateOrderUseCase(orderRepository);
      const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
      const createProductUseCase = new CreateProductUsecase(productRepository);

      const inputCustomer = {
         name: customer.getName(),
         type: 'pf',
         address: {
            street: customer.getAddress().getStreet(),
            number: customer.getAddress().getNumber(),
            city: customer.getAddress().getCity(),
            state: customer.getAddress().getState(),
            country: customer.getAddress().getCountry(),
            postalCode: customer.getAddress().getPostalCode(),
         },
      };
      const outputCustomerCreated = await createCustomerUseCase.execute(inputCustomer);

      const inputProduct = {
         name: product.getName(),
         price: product.getPrice(),
      };
      const outputProductCreated = await createProductUseCase.execute(inputProduct);

      const inputOrderCreate = {
         customerId: outputCustomerCreated.id,
         products: [
            {
               id: outputProductCreated.id,
               name: product.getName(),
               quantity: 3,
               price: product.getPrice(),
            },
         ],
      };
      const outputOrderCreated = await createOrderUseCase.execute(inputOrderCreate);

      expect(outputOrderCreated).toBeDefined();
      expect(outputOrderCreated.items.length).toBe(1);
      expect(outputOrderCreated.items[0].productName).toBe('Product XPTO');
   });
});

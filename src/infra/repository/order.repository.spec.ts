import { Sequelize } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import CustomerModel from '../db/sequelize/model/customer.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import ProductRepository from './product.repository';
import OrderRepository from './order.repository';
import Customer from '../../domain/entity/customer';
import Product from '../../domain/entity/product';
import Address from '../../domain/entity/address';
import OrderItem from '../../domain/entity/order-item';
import Order from '../../domain/entity/order';

describe('Order repository unit test', () => {
   let sequelize: Sequelize;
   let orderRepository: OrderRepository;
   let customerRepository: CustomerRepository;
   let productRepository: ProductRepository;

   beforeEach(async () => {
      sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: ':memory:',
         logging: false,
         sync: { force: true },
      });

      sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
      await sequelize.sync();

      orderRepository = new OrderRepository();
      customerRepository = new CustomerRepository();
      productRepository = new ProductRepository();
   });

   afterEach(async () => {
      await sequelize.close();
   });

   it('should create an order', async () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Rua a', 2, 'Cidade', 'Rio de Janeiro', 'Brasil', 12345678);

      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);

      const product = new Product(uuid(), 'P1', 20);
      await productRepository.create(product);

      const orderItem = new OrderItem(uuid(), product.id, product.name, 4, product.price);
      const order = new Order(uuid(), customer.id, [orderItem]);

      await orderRepository.create(order);

      const foundOrder = await orderRepository.find(order.id);

      expect(foundOrder).toStrictEqual(order);
   });
});

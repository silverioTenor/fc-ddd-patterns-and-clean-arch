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

   let customer: Customer;
   let address: Address;
   let product: Product;
   let orderItem: OrderItem;
   let order: Order;

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

      /**
       * Create customer
       */
      customer = new Customer(uuid(), 'Willy Wonka');
      address = new Address('Rua a', 2, 'Cidade', 'Rio de Janeiro', 'Brasil', 12345678);

      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);

      /**
       * Create product
       */
      product = new Product(uuid(), 'P1', 20);
      await productRepository.create(product);

      /**
       * Create OrderItem
       */
      orderItem = new OrderItem(uuid(), product.id, product.name, 4, product.price);
      order = new Order(uuid(), customer.id, [orderItem]);

      await orderRepository.create(order);
      await orderRepository.createOrderItem(orderItem, order.id);
   });

   afterEach(async () => {
      await sequelize.close();
   });

   it('should create a new order', async () => {
      let foundOrder = await orderRepository.find(order.id);
      expect(foundOrder).toStrictEqual(order);
   });

   it('should update an order', async () => {
      let foundOrder = await orderRepository.find(order.id);
      expect(foundOrder).toStrictEqual(order);

      /**
       * Create a new OrderItem
       */
      const newOrderItem = new OrderItem(uuid(), product.id, product.name, 4, 19.9);
      await orderRepository.createOrderItem(newOrderItem, order.id);

      const updateOrder = new Order(foundOrder.id, foundOrder.customerId, [
         ...foundOrder.items,
         newOrderItem,
      ]);

      /**
       * Update an OrderItem
       */
      await orderRepository.update(updateOrder);
      foundOrder = await orderRepository.find(order.id);

      expect(foundOrder.items.length).toBe(2);
      expect(foundOrder.items).toStrictEqual(updateOrder.items);
   });

   it('should throw error when update with invalid uuid', async () => {
      /**
       * Create a new OrderItem
       */
      const newOrderItem = new OrderItem(uuid(), product.id, product.name, 4, 19.9);
      await orderRepository.createOrderItem(newOrderItem, order.id);

      const updateOrder = {
         ...order,
         id: 'invalid-id',
         items: [order.items, newOrderItem]
      } as Order;

      await expect(async () => orderRepository.update(updateOrder)).rejects.toThrow(
         'Order not found!',
      );
   });

   it('should throw error when try find order with invalid uuid', async () => {
      await expect(async () => orderRepository.find('invalid-uuid')).rejects.toThrow(
         'Order not found!',
      );
   });

   it('should return all orders', async () => {
      const foundOrders = await orderRepository.findAll();
      expect(foundOrders.length).toBe(1);
   });

   it('should return an empty order list', async () => {
      await OrderModel.truncate();
      const foundOrders = await orderRepository.findAll();
      expect(foundOrders.length).toBe(0);
   });
});

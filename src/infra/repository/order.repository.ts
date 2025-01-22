import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order-item';
import IOrderRepository from '../../domain/repository/order.interface';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';

export default class OrderRepository implements IOrderRepository {
   async create(entity: Order): Promise<void> {
      await OrderModel.create({
         id: entity.id,
         customer_id: entity.customerId,
         items: entity.items.map(item => ({
            id: item.id,
            product_id: item.productId,
            product_name: item.productName,
            quantity: item.quantity,
            price: item.price
         })),
         total: entity.total(),
      });
   }

   async update(entity: Order): Promise<void> {
      throw new Error('Method not implemented.');
   }

   async find(id: string): Promise<Order> {
      let orderModel;

      try {
         orderModel = await OrderModel.findOne({
            where: { id },
            include: ['items'],
            rejectOnEmpty: true,
         });
      } catch (error) {
         throw new Error('Order not found!');
      }

      orderModel = orderModel.toJSON()

      const items = orderModel.items.map(
         (item: OrderItemModel) =>
            new OrderItem(item.id, item.product_id, item.product_name, item.quantity, item.price),
      );
      const order = new Order(orderModel.id, orderModel.customer_id, items);
      return order;
   }

   async findAll(): Promise<Order[]> {
      throw new Error('Method not implemented.');
   }
}

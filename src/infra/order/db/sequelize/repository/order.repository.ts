import Order from '@domain/checkout/entity/order';
import OrderItem from '@domain/checkout/entity/order-item';
import IOrderRepository from '@domain/checkout/repository/order.interface';
import OrderItemModel from '../model/order-item.model';
import OrderModel from '../model/order.model';

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
            price: item.price,
         })),
         total: entity.total(),
      });
   }

   async createOrderItem(entity: OrderItem, orderId: string): Promise<void> {
      await OrderItemModel.create({
         id: entity.id,
         product_id: entity.productId,
         order_id: orderId,
         product_name: entity.productName,
         quantity: entity.quantity,
         price: entity.price,
      });
   }

   async update(entity: Order): Promise<void> {
      let orderModel;

      try {
         orderModel = await OrderModel.findOne({
            where: { id: entity.id },
            include: ['items'],
            rejectOnEmpty: true,
         });
      } catch (error) {
         throw new Error('Order not found!');
      }

      await orderModel.update({
         items: entity.items.map(item => ({
            id: item.id,
            product_id: item.productId,
            product_name: item.productName,
            quantity: item.quantity,
            price: item.price,
         })),
         total: entity.total(),
      });
   }

   async find(id: string): Promise<Order> {
      let orderModel: OrderModel;

      try {
         orderModel = await OrderModel.findOne({
            where: { id },
            include: ['items'],
            rejectOnEmpty: true,
         });
      } catch (error) {
         throw new Error('Order not found!');
      }

      orderModel = orderModel.toJSON();

      const items = orderModel.items.map((item: OrderItemModel) => {
         return new OrderItem(
            item.id,
            item.product_id,
            item.product_name,
            item.quantity,
            item.price,
         );
      });

      const order = new Order(orderModel.id, orderModel.customer_id, items);
      return order;
   }

   async findAll(): Promise<Order[]> {
      let orderArrayModel = await OrderModel.findAll({ include: ['items'] });

      if (orderArrayModel.length > 0) {
         const orders = orderArrayModel.map((order: OrderModel) => {
            const items = order.items.map((item: OrderItemModel) => {
               return new OrderItem(
                  item.id,
                  item.product_id,
                  item.product_name,
                  item.quantity,
                  item.price,
               );
            });

            return new Order(order.id, order.customer_id, items);
         });
         return orders;
      }
      return [];
   }
}

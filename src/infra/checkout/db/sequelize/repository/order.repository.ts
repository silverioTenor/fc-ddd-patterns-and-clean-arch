import Order from '@domain/checkout/entity/order';
import OrderItem from '@domain/checkout/entity/order-item';
import IOrderRepository from '@domain/checkout/repository/order.interface';
import OrderItemModel from '../model/order-item.model';
import OrderModel from '../model/order.model';
import HttpNotFound from '@infra/@shared/api/error/http.not.found.error';

export default class OrderRepository implements IOrderRepository {
   async create(entity: Order): Promise<void> {
      await OrderModel.create({
         id: entity.getId(),
         customer_id: entity.getCustomerId(),
         items: entity.getItems().map(item => ({
            id: item.getId(),
            product_id: item.getProductId(),
            product_name: item.getProductName(),
            quantity: item.getQuantity(),
            price: item.getPrice(),
         })),
         total: entity.total(),
      });
   }

   async createOrderItem(entity: OrderItem, orderId: string): Promise<void> {
      await OrderItemModel.create({
         id: entity.getId(),
         product_id: entity.getProductId(),
         order_id: orderId,
         product_name: entity.getProductName(),
         quantity: entity.getQuantity(),
         price: entity.getPrice(),
      });
   }

   async update(entity: Order): Promise<void> {
      const orderModel = await OrderModel.findOne({
         where: { id: entity.getId() },
         include: ['items'],
         rejectOnEmpty: false,
      });

      if (!!orderModel) {
         await orderModel.update({
            items: entity.getItems().map(item => ({
               id: item.getId(),
               product_id: item.getProductId(),
               product_name: item.getProductName(),
               quantity: item.getQuantity(),
               price: item.getPrice(),
            })),
            total: entity.total(),
         });
         return
      }

      throw new HttpNotFound('Order not found!');
   }

   async find(id: string): Promise<Order> {
      let orderModel = await OrderModel.findOne({
         where: { id },
         include: ['items'],
         rejectOnEmpty: false,
      });

      if (!!orderModel) {
         orderModel = orderModel.toJSON();

         const items = orderModel.items.map((item: OrderItemModel) => {
            const orderItem = new OrderItem(
               item.product_id,
               item.product_name,
               item.quantity,
               item.price,
               item.id,
            );
            return orderItem;
         });

         const order = new Order(orderModel.customer_id, items, orderModel.id);
         return order;
      }

      throw new HttpNotFound('Order not found!');
   }

   async findAll(): Promise<Order[]> {
      let orderArrayModel = await OrderModel.findAll({ include: ['items'] });

      if (orderArrayModel.length > 0) {
         const orders = orderArrayModel.map((order: OrderModel) => {
            const items = order.items.map((item: OrderItemModel) => {
               const orderItem = new OrderItem(
                  item.product_id,
                  item.product_name,
                  item.quantity,
                  item.price,
                  item.id,
               );
               return orderItem;
            });

            const newOrder = new Order(order.customer_id, items, order.id);

            return newOrder;
         });
         return orders;
      }
      return [];
   }
}

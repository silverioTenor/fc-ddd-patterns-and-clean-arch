import { IFactory, IPayload } from "../../@shared/factory/factory.interface";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

export default class OrderFactory implements IFactory<Order> {
   create(payload: IPayload): Order {
      const { customerId, product } = payload;
      const orderItem = new OrderItem(product.id, product.name, product.quantity, product.price);
      const order = new Order(customerId, [orderItem]);

      return order;
   }
}

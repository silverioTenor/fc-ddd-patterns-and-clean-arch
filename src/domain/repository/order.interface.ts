import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import IRepository from "./repository.interface";

export default interface IOrderRepository extends IRepository<Order> {
   createOrderItem(entity: OrderItem, orderId: string): Promise<void>;
}

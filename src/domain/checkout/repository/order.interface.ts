import IRepository from '../../@shared/repository/repository.interface';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';

export default interface IOrderRepository extends IRepository<Order> {
   createOrderItem(entity: OrderItem, orderId: string): Promise<void>;
}

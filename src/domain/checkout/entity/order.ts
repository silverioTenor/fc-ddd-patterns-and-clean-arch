import { v4 as uuid } from 'uuid';
import OrderItem from './order-item';
import 'dotenv/config';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '@domain/@shared/notification/notification.error';
import OrderValidatorFactory from '../factory/order.validator.factory';

export default class Order extends Entity {
   private id: string;
   private customerId: string;
   private items: OrderItem[];

   constructor(customerId: string, items: OrderItem[], id?: string) {
      super();
      this.id = !!id ? id : uuid();
      this.customerId = customerId;
      this.items = items.map((item: any) => {
         return new OrderItem(item.productId, item.productName, item.quantity, item.price, item.id);
      });

      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   getId() {
      return this.id;
   }

   getCustomerId() {
      return this.customerId;
   }

   getItems() {
      return this.items;
   }

   validate() {
      OrderValidatorFactory.create().validate(this);
   }

   addItem(item: OrderItem) {
      this.items.push(item);
   }

   removeItem(item: OrderItem) {
      const index = this.items.findIndex(i => i.getId() === item.getId());
      if (index > -1) {
         this.items.splice(index, 1);
      }
   }

   total() {
      return this.items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
   }

   toString() {
      return `Order #${this.id} - Customer #${this.customerId}`;
   }
}

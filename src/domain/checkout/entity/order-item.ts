import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '@domain/@shared/notification/notification.error';
import OrderItemValidatorFactory from '../factory/order-item.validator.factory';

export default class OrderItem extends Entity {
   private id: string;

   constructor(
      private productId: string,
      private productName: string,
      private quantity: number,
      private price: number,
      id?: string,
   ) {
      super();
      this.id = !!id ? id : uuid();
      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   getId() {
      return this.id;
   }

   getProductId() {
      return this.productId;
   }

   getProductName() {
      return this.productName;
   }

   getQuantity() {
      return this.quantity;
   }

   getPrice() {
      return this.price;
   }

   validate() {
      OrderItemValidatorFactory.create().validate(this);
   }

   orderItemTotal() {
      return this.quantity * this.price;
   }

   toString() {
      return `${this.productName} - ${this.quantity} x ${this.price}`;
   }
}
